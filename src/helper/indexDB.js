function initIndexDB({ db_name, db_version }){
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open(db_name, db_version)

    request.onerror = error => {
      console.log(error)
      reject(error)
    }

    request.onsuccess = event => {
      resolve(event.target.result)
    }

    request.onupgradeneeded = event => {
      const localDb = event.target.result

      console.log('Created Store Object')
      localDb.createObjectStore('transaction-list', { autoIncrement: true, keyPath: 'transactionId'})
      console.log('Success Created Store Object')
    }
  })
}

export default initIndexDB