# agile-engine-test
clone the repo
inside the repo folder move to photos-gallery-app
run npm install
run ng serve

As the instructions said, this is what I was able to do in a little more than two hours

Features: 
User is able to get the content of and specific page (only existing values, validation of the page number wasnt possible inside the time frame)
User is able to get the specific data of each image by clicking on them

To Do: 
render the image request result.
create a simple cache to avoid requests for data that was previously requested .
add a catch to observables that make requests, in order to get a new bearer token in case the existing one expires.
