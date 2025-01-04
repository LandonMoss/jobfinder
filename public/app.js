//Show job details in a modal
function showJobDetails(title, company, location, description, salary ) {
  document.getElementById('modalJobTitle').innerText = title;
  document.getElementById('modalJobCompany').innerText = company;
  document.getElementById('modalJobLocation').innerText = location;
  document.getElementById('modalJobDescription').innerText = description;
  document.getElementById('modalJobSalary').innerText = `Salary: $${salary}`;
  document.getElementById('jobId').value = title;
  document.getElementById('jobTitle').value = title;
  const jobDetailsModal = new bootstrap.Modal(document.getElementById('jobDetailsModal'));
  jobDetailsModal.show();

}

let availableJobs = [
  { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA' },
  { title: 'Product Manager', company: 'Amazon', location: 'Seattle, WA' },
  { title: 'Data Scientist', company: 'Facebook', location: 'Menlo Park, CA' },
  { title: 'UX Designer', company: 'Apple', location: 'Cupertino, CA' },
  { title: 'Backend Developer', company: 'Netflix', location: 'Los Gatos, CA' }
  // Add more jobs as needed
];

displayAvailableJobs(availableJobs);


// Function to filter jobs by state
function filterJobsByState() {
  const stateFilter = document.getElementById('stateFilter').value;
  const filteredJobs = availableJobs.filter(job => job.location.includes(stateFilter));
  displayAvailableJobs(filteredJobs);
}

document.getElementById('stateFilter').addEventListener// Array to store bookmarked jobs




// Example data for bookmarked jobs and scheduled interviews
let bookmarkedJobs = [
  { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA' },
  { title: 'Product Manager', company: 'Amazon', location: 'Seattle, WA' }
];

let scheduledInterviews = [
  { title: 'Frontend Developer', company: 'Facebook', date: '2024-05-01' },
  { title: 'Backend Developer', company: 'Netflix', date: '2024-05-03' }
];



// Function to display available jobs
function displayAvailableJobs(jobs) {
  const jobList = document.getElementById('jobList');
  jobList.innerHTML = '';
  jobs.forEach(job => {
    const jobElement = document.createElement('div');
    jobElement.className = 'col-md-4';
    jobElement.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${job.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
          <p class="card-text"><strong>Location:</strong> ${job.location}</p>
          <p class="card-text"><strong>Description:</strong> ${job.description}</p>
          <p class="card-text"><strong>Salary:</strong> $${job.salary}</p>
          <button class="btn btn-primary" onclick="showJobDetails('${job.title}', '${job.company}', '${job.location}', '${job.description}', '${job.salary}')">View Details</button>
        </div>
      </div>
    `;
    jobList.appendChild(jobElement);
  });
}


function showScheduleInterviewModal() {
  const scheduleInterviewModal = new bootstrap.Modal(document.getElementById('scheduledInterviewsModal'));
  scheduleInterviewModal.show();
}



//function to toggle the chatbot
function toggleChatbot() {
  const chatbotContainer = document.querySelector('.chatbot-container');
  chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
}

//function to send a message to the chatbot
async function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value;
  if (!message) return;


//Display the user's message
const chatbotBody = document.getElementById('chatbotBody');
const userMessage = document.createElement('div');
userMessage.className = 'user-message';
userMessage.innerText = message;
chatbotBody.appendChild(userMessage);

//Clear the input
chatInput.value = '';

try {
// Call backend API to get chatbot response
const response = await fetch('http://localhost:3000/api/chatbot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message })
});
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();

//Display the chatbot's response
const botMessage = document.createElement('div');
botMessage.className = 'bot-message';
botMessage.innerText = data.message;
chatbotBody.appendChild(botMessage);

//Scroll to the bottom of the chatbot body
chatbotBody.scrollTop = chatbotBody.scrollHeight;
} catch (error) {
  console.error('Error:', error);
  const errorMessage = document.createElement('div');
  errorMessage.className = 'bot-message';
  errorMessage.innerText = 'Error: Unable to fetch chatbot boomer.';
  chatbotBody.appendChild(errorMessage);
}
}

//function to show upload resume modal
function showUploadResumeModal() {
  const uploadResumeModal = new bootstrap.Modal(document.getElementById('uploadResumeModal'));
    uploadResumeModal.show();
}
       //TASK URGENT: 1/3/2025 Landon
  //Next task is to make bookmark and schedule interview modals work properly
  //Update: we moved them to a icon feature not on the bottom! 1/3/2025 Landon





// Function to bookmark a job
function bookmarkJob(title, company, location, description, salary) {
  const job = { title, company, location, description, salary };
  bookmarkedJobs.push(job);
  alert('Job bookmarked successfully!');
}


// Function to schedule an interview
function scheduleInterview() {
  const date = document.getElementById('interviewDate').value;
  const time = document.getElementById('interviewTime').value;
  const company = document.getElementById('modalJobCompany').innerText;
  if (date && time) {
    const interview = { company, date, time };
    scheduledInterviews.push(interview);
    displayScheduledInterviews();
    alert('Interview scheduled successfully!');
    const scheduleInterviewModal = bootstrap.Modal.getInstance(document.getElementById('scheduledInterviewsModal'));
    scheduleInterviewModal.hide();
    //Updates interview notification
    updateInterviewNotification();
  } else {
    alert('Please select a date and time for the interview.');
  }
}

// Function to update the interview notification badge
function updateInterviewNotification() {
  const today = new Date().toISOString().split('T')[0];
  const todayInterviews = scheduledInterviews.filter(interview => interview.date === today);
  const notificationBadge = document.getElementById('interviewNotification');
  if (todayInterviews.length > 0) {
    notificationBadge.innerText = todayInterviews.length;
    notificationBadge.style.display = 'inline';
  } else {
    notificationBadge.style.display = 'none';
  }
}
 
  // Event listeners for modals
document.getElementById('bookmarkedJobsModal').addEventListener('show.bs.modal', displayBookmarkedJobs);
document.getElementById('scheduledInterviewsModal').addEventListener('show.bs.modal', displayScheduledInterviews);

  
// Function to display scheduled interviews
function displayScheduledInterviews() {
  const scheduledInterviewsContainer = document.getElementById('scheduledInterviews');
  scheduledInterviewsContainer.innerHTML = '';
  if (Array.isArray(scheduledInterviews)) {
    scheduledInterviews.forEach(interview => {
      const interviewElement = document.createElement('div');
      interviewElement.className = 'col-md-4';
      interviewElement.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Interview Scheduled</h5>
            <h6 class="card-subtitle mb-2 text-muted">${interview.company}</h6>
            <p class="card-text"><strong>Date:</strong> ${interview.date}</p>
            <p class="card-text"><strong>Time:</strong> ${interview.time}</p>
          </div>
        </div>
      `;
      scheduledInterviewsContainer.appendChild(interviewElement);
    });
  } else {
    console.error('Scheduled interviews is not an array');
  }
}

// Function to display bookmarked jobs
function displayBookmarkedJobs() {
  const bookmarkedJobsContainer = document.getElementById('bookmarkedJobs');
  bookmarkedJobsContainer.innerHTML = '';
  if (Array.isArray(bookmarkedJobs)) {
  bookmarkedJobs.forEach(job => {
    const jobElement = document.createElement('div');
    jobElement.className = 'col-md-4';
    jobElement.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${job.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
          <p class="card-text"><strong>Location:</strong> ${job.location}</p>
        </div>
      </div>
    `;
    bookmarkedJobsContainer.appendChild(jobElement);
  });
}  else {
    console.error('Bookmarked jobs is not an array');
  }
}

  
  //Function to handle mock interview form submission
  function submitInterview() {
    const answer = document.getElementById('interviewAnswer').value;
    alert('Your answer has been submitted. Thank you!');
  }

document.addEventListener('DOMContentLoaded', () => {
  const jobList = document.getElementById('jobList');

  const jobs = [
      { title: 'Software Engineer', company: 'Facebook', location: 'Seattle', description: "", salary: 120000 },
      { title: 'Product Manager', company: 'Lumen Technologies', location: 'Illinois', description: "", salary: 130000 },
      { title: 'Data Scientist', company: 'Health Care Ins', location: 'Knoxville', description: "", salary: 140000 },
      { title: 'Frontend Developer', company: 'Apple', location: 'Los Angeles', description: "", salary: 150000 },
      { title: 'Backend Developer', company: 'Techies', location: 'Seattle', description: "", salary: 160000 },
      { title: 'DevOps Engineer', company: 'Cloud Computing', location: 'Austin', description: "", salary: 170000 },
      { title: 'UX Designer', company: 'Design Works', location: 'Boston', description: "", salary: 180000 },
      { title: 'UI Developer', company: 'Web Solutions', location: 'Denver', description: "", salary: 190000 },
      { title: 'Full Stack Developer', company: 'Web Apps', location: 'Miami', description: "", salary: 200000 },
      { title: 'Software Engineer', company: 'Tech Corp', location: 'New York', description: "", salary: 1300000 },
      { title: 'Product Manager', company: 'Business Inc.', location: 'San Francisco', description: "", salary: 1400000 },
      { title: 'Data Scientist', company: 'Data Solutions', location: 'Chicago', description: "", salary: 1500000 },
      { title: 'Frontend Developer', company: 'Netflix', location: 'Los Angeles', description: "", salary: 1600000 },
      { title: 'Backend Developer', company: 'Techies', location: 'Seattle', description: "", salary: 1700000 },
      { title: 'DevOps Engineer', company: 'Cloud Computing', location: 'Austin', description: "", salary: 1800000 },
      { title: 'UX Designer', company: 'Design Works', location: 'Boston', description: "", salary: 1900000 },
      { title: 'UI Developer', company: 'Web Solutions', location: 'Denver', description: "", salary: 2000000 },
      { title: 'Full Stack Developer', company: 'Web Apps', location: 'Miami', description: "", salary: 2110000 },
      { title: 'Software Engineer', company: 'Citi Bank', location: 'New York', description: "", salary: 120000 },
      { title: 'Product Manager', company: 'Amazon', location: 'New York', salary: 130000 },
      { title: 'Data Scientist', company: 'Data Solutions', location: 'Chicago', description: "", salary: 140000 },
      { title: 'Frontend Developer', company: 'Google', location: 'Atlanta', description: "", salary: 150000 }, 
      { title: 'Backend Developer', company: 'City Furniture', location: 'Seattle', description: "", salary: 120000 },
      { title: 'DevOps Engineer', company: 'Cloud Computing', location: 'Austin', description: "", salary: 150000 },
      { title: 'UX Designer', company: 'Duolingo', location: 'San Fransisco', description: "", salary: 1700000 },
      { title: 'UI Developer', company: 'Adroited', location: 'Cape Coral', description: "", salary: 150000 },
      { title: 'Full Stack Developer', company: 'Mojang', location: 'Sweden', description: "", salary: 1600000 },
      { title: 'Software Engineer', company: 'BrookSource', location: 'Tampa', description: "", salary: 1300000 },
      { title: 'Product Manager', company: 'Google', location: 'San Francisco', description: "", salary: 1200000 },
      { title: 'Data Scientist', company: 'Spotify', location: 'Los Angeles', description: "", salary: 1400000 },
  ];

  


  function displayJobs(jobs) {
      jobList.innerHTML = ''; // Clear the existing job list
      jobs.forEach(job => {
          const col = document.createElement('div');
          col.className = 'col-md-4';

          const card = `
              <div class="card shadow-sm">
                  <div class="card-body">
                      <h5 class="card-title">${job.title}</h5>
                      <p class="card-text">${job.company}</p>
                      <p class="text-muted">${job.location}</p>
                      <p class="text-muted">Salary: $${job.salary}</p>
                     <button class="btn btn-primary" onclick="showJobDetails('${job.title}', '${job.company}', '${job.location}', '${job.description}', ${job.salary})">View Details</button>
                      <button class="btn btn-secondary" onclick="showScheduleInterviewModal()">Schedule Interview</button>
                     <button class="btn btn-warning" onclick="bookmarkJob('${job.title}', '${job.company}', '${job.location}', '${job.description}', ${job.salary})">Tag</button>



                  </div>
              </div>
          `;

          col.innerHTML = card;
          jobList.appendChild(col);
      });
  }



  // Filter jobs
  function filterJobs() {
      console.log("Search button is clicked");
      const searchTerm = document.getElementById("searchInput").value.toLowerCase();


      const filteredJobs = jobs.filter((job) => {
          return (
              job.title.toLowerCase().includes(searchTerm) ||
              job.company.toLowerCase().includes(searchTerm) ||
              job.location.toLowerCase().includes(searchTerm)
          );
      });
      displayJobs(filteredJobs);

    }


  //Function to get a random mock interview question
  function getMockInterviewQuestion() {
    const questions = [
      "Write a function to reverse a string.",
        "Implement a function to check if a number is prime.",
        "Write a function to find the maximum element in an array.",
        "Implement a function to merge two sorted arrays.",
        "Write a function that takes a sentence as input and returns the longest word in it.",
        "Write a program to remove duplicate characters from a string",
       "Write a program to remove duplicate characters from a string.",
       "If you see this one your a boomer get pranked XD",
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }


 
  
   
  // Display all jobs initially
  displayJobs(jobs);

  // Add event listener to the search button
  document.getElementById('searchButton').addEventListener('click', filterJobs);



 // Handle login form submission
 document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Login successful');
    //Save token and redirect to dashboard
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard'; //Redirect to dashboard
  } else {
    alert(data.msg);
  }
});

//Handle resume upload form submission
document.getElementById('uploadResumeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const fileField = document.getElementById('resume');
  const jobId = document.getElementById('jobId').value;
  const jobTitle = document.getElementById('jobTitle').value;

  formData.append('resume', fileField.files[0]);
  formData.append('jobId', jobId);
  formData.append('jobTitle', jobTitle);

  const res = await fetch('/api/upload/resume', {
      method: 'POST',
      body: formData
  });

  const data = await res.json();
  if (res.ok) {
      alert('Resume uploaded successfully');
      //Handle uploaded file as needed
  } else {
      alert(data.msg);
  }
});

//Handle Mock Interview form submission
document.getElementById('mockInterviewModal').addEventListener('show.bs.modal', () => {
  const question = getMockInterviewQuestion();
  document.getElementById('mockInterviewQuestion').innerText = question;
});





//Handle register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (res.ok) {
      alert('Registration successful');
      // Save the token and redirect or update UI
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; //Redirect to dashboard
  } else {
      alert(data.msg);
  }
});

  // Handle mock interview modal show event
  document.getElementById('mockInterviewModal').addEventListener('show.bs.modal', () => {
    const question = getMockInterviewQuestion();
    document.getElementById('interviewQuestion').innerText = question;
});


});