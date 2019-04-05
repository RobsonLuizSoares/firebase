
    const config = {
    apiKey: "AIzaSyAKrELjaFYEgBaOACQhvRuEzSx0Ae5k6r8",
    authDomain: "leituras-72a33.firebaseapp.com",
    databaseURL: "https://leituras-72a33.firebaseio.com",
    projectId: "leituras-72a33",
    storageBucket: "leituras-72a33.appspot.com",
    messagingSenderId: "258620310673"
  }
	firebase.initializeApp(config)
	
	var firestore = firebase.firestore()

	const docRef = firestore.doc('samples/sandwichData')
	
	const outputHeader = document.querySelector('#hotDogOutput')
	const outputValue = document.querySelector('#valueOutput')
	const inputTextField = document.querySelector('#latestHotDogStatus')
	const inputValueField = document.querySelector('#valueOfSandwuich')
	const saveButton = document.querySelector('#saveButton')
	const loadButton = document.querySelector('#loadButton')

	saveButton.addEventListener('click', () => {
		const textToSave = inputTextField.value
		const valueToSave = inputValueField.value
		console.log('I am going to save '+ textToSave + ' to Firestore')
		docRef.set({
			hotDogStatus: textToSave,
			value: valueToSave
		}).then(()=> {
			console.log('Status saved!')
		}).catch((error)=>{
			console.log('Got an error: ', error)
		})
	})

	loadButton.addEventListener('click', () => {
		docRef.get().then((doc) =>{
			if(doc && doc.exists) {
				const myData = doc.data()
				outputHeader.innerText = 'Hot dog status: ' + myData.hotDogStatus
				outputValue.innerText = 'Valor '+ myData.value
			}
		}).catch((error) => {
			console.log('Got an error: ', error)
		})
	})

	getRealTimeUpdates = () => {
		docRef.onSnapshot((doc) => {
			if(doc && doc.exists) {
				const myData = doc.data()
				console.log("Check out this document I received ", doc)
				outputHeader.innerText = 'Hot dog status: ' + myData.hotDogStatus
				outputValue.innerText = 'Valor '+ myData.value
			}
		})
	}

	getRealTimeUpdates()
