require('dotenv').config();
sworm = {
    driver: 'oracle',
    config: {
        user: process.env.HR_USER,
        password: process.env.HR_PASSWORD,
        connectString: process.env.HR_CONNECTIONSTRING,
        pool: true,
        options: {
            // options to set on `oracledb`
            maxRows: 1000
        }
    }
}

oracledb = {
    user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING
}

module.exports = {
    sworm,
    oracledb
}