const { Item } = require("../models/Item");
const Order = require("../models/Order");

// Returns orders for a particular vendor
async function getOrders(vendor) {
  const items = await Item.find({ vendor: vendor._id });

  let orders = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i])
      orders = [
        ...orders,
        await Order.find({ item: items[i]._id })
          .populate("item")
          .populate("buyer"),
      ];
  }

  return orders;
}

// Returns count of Orders in ACCEPTED or COOKING stage
async function checkOrderLimit(vendor) {
  let orders = await getOrders(vendor);

  let count = 0;
  for (let i = 0; i < orders.length; i++) {
    const ordersPerItem = orders[i];
    for (let j = 0; j < ordersPerItem.length; j++) {
      if (
        ordersPerItem[j].status === "ACCEPTED" ||
        ordersPerItem[j].status === "COOKING"
      )
        count++;
    }
  }

  return count;
}

// Function to return counts for orders placed, pending and completed orders
async function orderCount(vendor) {
  let orders = await getOrders(vendor);

  let placedOrderCount = 0,
    rejectedOrderCount = 0,
    completedOrderCount = 0;

  for (let i = 0; i < orders.length; i++) {
    const ordersPerItem = orders[i];

    placedOrderCount += ordersPerItem.length;
    for (let j = 0; j < ordersPerItem.length; j++) {
      switch (ordersPerItem[j].status) {
        case "COMPLETED":
          completedOrderCount++;
          break;
        case "REJECTED":
          rejectedOrderCount++;
          break;
      }
    }
  }

  let pendingOrderCount =
    placedOrderCount - completedOrderCount - rejectedOrderCount;

  return { placedOrderCount, pendingOrderCount, completedOrderCount };
}

module.exports = { getOrders, checkOrderLimit, orderCount };
