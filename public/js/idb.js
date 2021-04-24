//create a variable to hold db connection
let db;
// establish a connection to IndexedDb database called 'budgetDb' and set it to version 1

const request = indexedDb.open('budgetDb', 1);

// this event will emit if the database version changes from v1
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    // create an object store (table) called budget_items, set it to have an auto incrementing primary key
    db.createObjectStore('budget_items', { autoIncrement: true })
};

request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result
    
    // check if app is online, if yes run uploadPizza() function to send all local data to api
    if (navigator.onLine) {
        //uploadDatabase();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
}

// This function will execute if attempt to submit a budget item and there is no connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['budget_items'], 'readwrite');

    // access the object store for 'budget_items'
    const budgetObjectStore = transaction.objectStore('budget_items');

    // add record to the object store
    budgetObjectStore.add(record);
}

