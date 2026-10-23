// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const form= document.querySelector('form') 
const inputField= document.querySelector('#state-input')
const alertsContainer = document.querySelector('#alerts-display')
const errorMessageDiv=document.querySelector('#error-message')

document.addEventListener('DOMContentLoaded', ()=>{
    if (form){
        form.addEventListener('submit',handleFormSubmit)
    }else{
        const searchButton=document.querySelector('button')
        if(searchButton){
            searchButton.addEventListener('click',handleFormSubmit)
        }
    }
})
function handleFormSubmit(event){
    event.preventDefault()
    const rawInput=inputField.value.trim().toUpperCase()
    const stageRegex=/^[A-Z]{2}$/
    if(!stageRegex.test(rawInput)){
        displayError({message:"please enter a valid two letter state abbreviation."})
        return;
    }
    resetUI()
    fetchWeatherAlerts(rawInput)
}
function fetchWeatherAlerts(stateAbbreviation){
    const url= `https://api.weather.gov/alerts/active?area=${stateAbbreviation}`;
        
        fetch (url)
        .then(response=>{
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        })
        .then(data=>{
            hideError()
            displayAlerts(data, stateAbbreviation)
        })
        .catch(errorObject=> {
            displayError(errorObject)
        })
       
    }
 function displayAlerts(data,stateAbbreviation){
    let totalAlerts=0;

    if (data &&data.features) {
        totalAlerts=data.features.length
    }else if(Array.isArray(data)){
        totalAlerts=data.length
    }
    
    const summaryMessage =document.createElement('h3')
        summaryMessage.textContent=`Weather Alerts: ${totalAlerts}`;
        alertsContainer.append(summaryMessage)

        if(totalAlerts >0){
            const ul=document.createElement('ul')

            data.features.forEach(feature=>{
                const headLineText=feature.properties.headline
                const li=document.createElement('li')
                li.textContent=headLineText
                ul.append(li)
            })
            alertsContainer.append(ul)
        }else{
            const noAlertMessage=document.createElement('p')
            noAlertMessage.textContent="no active weather alerts for this state."
            alertsContainer.append(noAlertMessage)
        }
    }
function resetUI(){
     if (inputField) inputField.value=''
     if(alertsContainer)alertsContainer.innerHTML=''
     hideError()
    }
function displayError(errorObject){
    if (errorMessageDiv){
        errorMessageDiv.textContent=errorObject.message
        errorMessageDiv.classList.remove('hidden')
        errorMessageDiv. classList.add('error')
        }
        console.error(errorObject.message)}

function hideError(){
     if(errorMessageDiv){
        errorMessageDiv.textContent=''
        errorMessageDiv.classList.add('hidden')
        errorMessageDiv.classList.remove('error')
            }
        }
        function showLoadingSpinner(){
            if (loadingSpinner){
                loadingSpinner.style.display='block'

            }
        }
        function hideLoadingSpinner(){
            if (loadingSpinner){
                loadingSpinner.style.display='none'
            }
        }
    
