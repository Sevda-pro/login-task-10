const db = require("../util/db.config");
const User = db.customers
const Expenses = db.expenses

const getusers = async (req, res) => {
    const user = await User.findAll();
    const expense = await Expenses.findAll();
    // console.log(user)
    const userexp = {}
    expense.forEach(element => {
        if (userexp[element.customerId])
            userexp[element.customerId] += element.Price
        else userexp[element.customerId] = element.Price

    });
    // 
    console.log(userexp)
    var userLeader = [];
    user.forEach((us) => {
        userLeader.push({ name: us.Name, total_cost: userexp[us.id] })
    })
    userLeader.sort((a, b) => b.total_cost - a.total_cost)
    console.log(userLeader)
    return res.status(200).send(userLeader)
}




module.exports = { getusers };