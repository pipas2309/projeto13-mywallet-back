async function test(req, res) {
      
    try {
        console.log('testanu');
        return res.sendStatus(418);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export default test;