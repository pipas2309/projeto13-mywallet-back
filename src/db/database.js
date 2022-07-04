import db from './mongodb.js'
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

async function postEntries() {

}

async function session() {

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
    session
};