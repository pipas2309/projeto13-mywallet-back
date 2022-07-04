import db  from './mongodb.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function findUser(user) { //done
    try {
        const userOnDatabase = await db.collection('users').findOne({ email: user.email });

        if (!userOnDatabase) {
          return '404';
        }
    
        return userOnDatabase;

      } catch (error) {
        console.error(error);
        return '500';
      }
}

async function createUser(user) { //done
    try {
        const alreadyExist = await db.collection('users').findOne({ email: user.email});

        if(alreadyExist) {
            console.log('Usuário cadastrado - processo interrompido em createUser()');
            return 'alreadyExist';
        }

        const hashPassword = bcrypt.hashSync(user.password, 10);

        await db.collection('users').insertOne({
            ...user, password: hashPassword
        });
        
        return 'created';
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

async function getEntries(user) {
    try {
        const allTransactions = await db.collection('movimentation-db').find({userId: user.userId}).toArray();

        return allTransactions;

    } catch (error) {
        console.log(error);
        return 'error';
    }
}

async function postEntries(entry, user, date) { //done
    try {
        await db.collection('movimentation-db').insertOne(
            {
                ...entry,
                userId: user.userId,
                date 
            });

        return '201';

    } catch (error) {
        console.error(error);
        return 'error';
    }
}

async function session(token) { //done
    try {
        const actualSession = await db.collection('tokens').findOne({token});
        
        if(actualSession) {
            return actualSession;
        } else {
            return 'error';
        }
    
    } catch (error) {
        return 'catch error';
    }
}

async function newToken(user) { //done

    const lastSession = await db.collection('tokens').findOne({userId: new ObjectId(user._id)});

    const token = uuid();
    const time = Date.now();

    if(time - lastSession.time < 6000 ) {
        return lastSession;
    }

    if(lastSession) {

        try {
            await db.collection('tokens').updateOne({userId: new ObjectId(user._id)},
            {
                $set: {token, time}
            })
            return {
                ...lastSession,
                token
            };
        } catch (error) {
            return 'error';
        }
    }

    let userData = {
        name: user.username,
        email: user.email,
        userId: user._id,
        token,
        time
    }

    await db.collection('tokens').insertOne(userData);

    return userData;
}


/* async function modifyEntry() {

} */

/* async function deleteEntry() {

} */

export {
    findUser,
    createUser,
    getEntries,
    postEntries,
    session,
    newToken
};