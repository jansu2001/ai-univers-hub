const loadData = () => {
  loadingSpinner(true);
  const URL = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(URL)
    .then(res => res.json())
    .then(data => displayAllData(data.data.tools.slice(0, 6)))
}

const displayAllData = (datas) => {
  const mainCard = document.getElementById('main-card');
  mainCard.innerHTML = '';

  // Loop For All Single Data
  datas.forEach(singleData => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.innerHTML = `
        <div class="col">
          <div class="card w-100 p-4">
            <img src="${singleData.image}" class="p-3 rounded card-img-top" alt="...">
            <div class="card-body ">
              <h5 class="card-title fs-3 fw-bold ">features</h5>
              <div >
              <p class="mb-2 card-text fw-light">
              1. ${singleData.features[0]}
              </p>
              <p class="mb-2 card-text fw-light">
              2. ${singleData.features[1]}
              </p>
              <p class="card-text fw-light">
              3. ${singleData.features[2] ? singleData.features[2] : 'Not available'}
              </p>
              </div>
            </div>
            <hr>
            <div class=" ">
            <div>
            <h1 class="fs-4 fw-bold">${singleData.name}</h1>
            </div>
            <div class="d-flex justify-content-between">
            <div><p><i class=" fa-solid fa-calendar-days"></i> ${singleData.published_in}</p></div>
            
            <div>
            <i class="text-danger fa-solid fa-arrow-right"
             onclick="cardModal('${singleData.id}')"
             data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#extraLargeModal"></i>
            </div>
            </div>
              
            </div>
          </div>
        </div>        
        `;
    mainCard.appendChild(cardDiv)

  });

  // Stop loadingSpinner
  loadingSpinner(false);

};

// Card Modal Section
const cardModal = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(URL)
    .then(res => res.json())
    .then(data => displayCardModal(data))
}

// Display Card Modal
const displayCardModal = (data) => {
  const cardModal = document.getElementById('modal-body');
  const person = data.data.features
  const propertyValues = Object.values(person);


  // kajflkj ajfjadj lalkjfasdf lkakjsdfkjsaf l;aksdjfsadj f 
  // lkdffj lkaj



  // Card Modal Inner HTML
  cardModal.innerHTML = `
    <div class="container   text-center p-4">
  <div class="row  align-items-start gap-2">
    <div  class="col">
    <div id="left-side">
    <h5 class="card-title fw-bold">${data.data.description} <span class="badge text-bg-warning">
    </span></h5>
    <div class="d-flex justify-content-between mt-4">
      <p id="pricing-box" class="text-success border border fw-bold rounded">
      ${data.data.pricing[0].price ? data.data.pricing[0].price : 'No Plans Available'}
      <br>
      ${data.data.pricing[0].plan ? data.data.pricing[0].plan : 'No Plans Available'}
      </p>
      <p id="pricing-box" class="text-warning-emphasis border border fw-bold rounded">
      ${data.data.pricing[1].price ? data.data.pricing[1].price : 'No Plans Available'}
      <br> 
      ${data.data.pricing[1].plan ? data.data.pricing[1].plan : 'No Plans Available'}
      </p>
      <p id="pricing-box" class="text-danger border border fw-bold rounded">
      ${data.data.pricing[2].price ? data.data.pricing[2].price : 'No Plans Available'}
      <br> 
      ${data.data.pricing[2].plan ? data.data.pricing[2].plan : 'No Plans Available'}</p>
    </div>


    <div class="d-flex justify-content-between mt-2">
  <div>
  <h1 class="fw-bold fs-4">features</h1>
  <li>${propertyValues[0].feature_name ? propertyValues[0].feature_name : 'Not Available'}</li>
  <li>${propertyValues[1].feature_name ? propertyValues[1].feature_name : 'Not Available'}</li>
  <li>${propertyValues[2].feature_name ? propertyValues[2].feature_name : 'Not Available'} </li>
  </div>
  
  <div>
  <h1 class="fw-bold fs-4">integrations</h1>
  <ul>
  <li>${data.data.integrations[0] ? data.data.integrations[0] : 'Not Available'}</li>
  <li>${data.data.integrations[1] ? data.data.integrations[1] : 'Not Available'}</li>
  <li>${data.data.integrations[2] ? data.data.integrations[2] : ' Not Available'}</li>
</ul>
  </div>
</div>

    
  </div>
    </div>
    <div class="col">
    <div id="right-side" class=" card p-4 ">
    <div class="relative">
    <img src="${data.data.image_link[0]}" class="card-img-top" alt="...">
    <h1 class="absulate fs-6 rounded bg-danger">
    ${data.data.accuracy.score ? data.data.accuracy.score * 100 : ''}% accuracy</h1>
    </div>
    <div class="card-body">
      <h5 class="card-title mt-4 fw-bold">${data.data.input_output_examples[0].input}</h5>
      <p class="card-text mt-4">
      ${data.data.input_output_examples[0].output
      ? data.data.input_output_examples[0].output.slice(0, 160) : 'No! Not Yet! Take a break!!!'}...</p>
      
    </div>
  </div>
    </div>
      </div>
    </div>
  </div>
</div>

    `;
};

// See More Button
const showAllData = () => {
  // Start Loading When Click On the Show more Button
  loadingSpinner(true);

  const URL = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(URL)
    .then(res => res.json())
    .then(data => displayAllData(data.data.tools))

  // Hide Show More Button Inner HTML
  const showMoreBtn = document.getElementById('show-more')
  showMoreBtn.innerHTML = ''
}

const loadingSpinner = (isLoading) => {
  const loaderSection = document.getElementById('loader')
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none')
  }
}

loadData()