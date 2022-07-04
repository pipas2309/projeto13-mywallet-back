import db  from './mongodb.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function findUser(user) {
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

async function getEntries() {

}

async function postEntries(entry, user, date) {
    try {
        await db.collection('movimentation-db').insertOne(
            {
                ...entry,
                userId: user._id,
                date 
            });

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

async function session(user) {
    const sessionDb = await db.collection('tokens').findOne({userId: user._id});

    if(sessionDb) {
        return {
            token: sessionDb.token,
            email: user.email
        };
    };

    const userDb = await db.collection('users').findOne({_id: sessionDb.userId});

    return userDb;
}

async function newToken(user) { //done

    const lastSession = await db.collection('tokens').findOne({userId: new ObjectId(user._id)});

    const token = uuid();

    if(lastSession) {
        try {
            await db.collection('tokens').updateOne({userId: new ObjectId(user._id)},
            {
                $set: {token}
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
        token
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