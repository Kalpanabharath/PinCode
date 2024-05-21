



document.addEventListener('DOMContentLoaded', () => {
    // Custom input element definition
    class CustomInput extends HTMLElement {
        constructor() {
            super();


            const style = document.createElement('style');
            style.textContent = `
                input {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    box-sizing: border-box;
                    border: 2px solid rgb(10, 251, 255);
                    border-radius: 4px;
                    font-size: 16px;
                    color:black;
                    outline:none;
                }
                input:focus {
                    border-color: #555;
                }
            `;

            // Attach a shadow DOM tree to the instance
            const shadow = this.attachShadow({ mode: 'open' });
            // Create input element
            const input = document.createElement('input');
            // Set up the input element
            input.type = 'text';
            input.id = 'customId'; // Corrected ID name
            // Append the input element to the shadow DOM
            input.addEventListener('input', () => {
                if (input.value.length === 6) {
                    btnfun();
                    console.log("run")
                }
            });

            shadow.appendChild(input);
            shadow.appendChild(style);
        }

        getValue() {
            const input = this.shadowRoot.getElementById('customId'); // Corrected ID name
            return input ? input.value : 'noval';
        }
    }

    // Define the custom input element
    customElements.define('custom-input', CustomInput);

    
});


 // Function to fetch data from API
 async function fetchData(pincode) {
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
     
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    
    }
}


async function btnfun() {
    // Retrieve the custom input element
    const customInput = document.querySelector('custom-input');
    // Get the input value
    const pincode = customInput.getValue();
    // Log the input value
    console.log('Input Value:', pincode);

     // Fetch data from API
     const responseData = await fetchData(pincode);
     
    console.log(responseData)
    
    
    if (responseData && responseData.length > 0 && responseData[0].Status === 'Success') {
       let filt=responseData[0].PostOffice
       
        let udt= filt.filter(postOffice => postOffice.BranchType === 'Head Post Office');
       if(udt.length==1){
        console.log("if runing")
        console.log(udt)
        let nameval=udt[0].Name
        let state=udt[0].State
       let country=udt[0].Country
       displaydetail(nameval,state,country)
       console.log(nameval)
       console.log(state)
       console.log(country)
       }else{
        console.log("eleseruning")
            let udt= filt.filter(postOffice => postOffice.BranchType === 'Sub Post Office');
            let nameval=udt[0].Name
            let state=udt[0].State
            let country=udt[0].Country
            console.log(nameval)
            console.log(state)
            console.log(country)
            displaydetail(nameval,state,country)
           
        }
    } else {
        console.log('Invalid pincode or API error');
         let paraEl=document.getElementById("invalid")
         paraEl.style.display="block"
    }
    function displaydetail(nameval,state,country){
        let citynameEl=  document.createElement('para');
        citynameEl.innerText=`cityname:${nameval}`;
        citynameEl.className="result"
        document.body.appendChild(citynameEl)
        let stateEl=  document.createElement('para');
        stateEl.innerText=`state:${state}`
        stateEl.className="result"
        document.body.appendChild(stateEl)
        let countryEl=  document.createElement('para');
        countryEl.innerText=`country:${country}`
        countryEl.className="result"
        document.body.appendChild(countryEl)
    }
}