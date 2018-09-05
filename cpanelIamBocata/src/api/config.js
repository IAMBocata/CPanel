'use strict'

export default {

    host: '',

    apiKey: '',

    paths: {
        login: '/api/cpanellogin.php?',
        changePassword: '/api/changePassword.php?',

        // Products
        createProduct: '/api/createProduct.php',    
        setOfTheDay: '/api/setOfTheDay.php?',       
        disableProduct: '/api/disableProduct.php?', 
        enableProduct: '/api/enableProduct.php?',   
        productList: '/api/products.php?',          

        // Users
        createUser: '/api/createUser.php?',         
        disableUser: '/api/disableUser.php?',       
        enableUser: '/api/enableUser.php?',        
        userList: '/api/users.php?',    
        resetPassword: '/api/resetPassword.php?',            

        // Categories
        createCategory: '/api/createCategory.php?',
        categoryList: '/api/categories.php?',      

        // Buys
        activeBuys: '/api/startedBuys.php?',      
        startBuy: '/api/startBuy.php?',           
        endBuy: '/api/endBuy.php?',
        cancelBuy: '/api/cancelBuy.php?',

        // Parameters
        parameters: '/api/parameters.php?',
        setParameters: '/api/setParameters.php?',

        bi: {
            topUsers: '/api/stats/topUsers.php?',
            topSales: '/api/stats/topBuys.php?',
            topLikes: '/api/stats/topLikes.php?',
            buysOfThisWeek: '/api/stats/buysOfThisWeek.php?',
            buysOfThisMonth: '/api/stats/buysOfThisMonth.php?',
            buysOfThisYear: '/api/stats/buysOfThisYear.php?',
            moneys: '/api/stats/moneys.php?',
            hourOfBuys: '/api/stats/hourOfBuys.php?',
            numberOfUsers: '/api/stats/numberOfUsers.php?'
        }
    }
}
