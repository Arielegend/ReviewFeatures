# Reviews Feature

<p>
Welcome to Reviews feature.
<br/>
Written with React Typescript, backed up with JsonServer.
</p>

## Installation

- git clone https://github.com/Arielegend/ReviewFeatures.git
- cd ReviewFeatures
- npm i
- npm install -g json-server

<p>
Good, at this point we installed all dependencies. 
<br/>
Now we need to <b> open 2 terminals at ReviewFeatures folder </b>
<br/>
Run the following Commands (Command per terminal)
</p>
<ul>
    <li>
        json-server --watch data/db.json --port 9000
        <p>This command will open activate a Json server at port 9000</p>
    </li>
    <li>
        npm start
        <p>This command will start React app, mostly at port 3000</p>
   </li>

</ul>

## Usage
<p>
Upon successful launch, you screen should see dashboard divided by 2 main components. 
</p>
<li>On the left side we can see all reviews current in server, and add a review manually.</li>
<li>On the right side we have a control panel, allowing us to:
<ol>
<li>Load reviews from Json file to the server. 
<br/>
The Json file is located at src/utils/ReviewsAdd.json
<br/>
Simply Modify it at your please and push it to the server. 
<br/>
Pay attention to <b>keep it in it's current format </b>.
</li>
<li>Load Generic Reviews
<br/>
At data/db.json we store our Generic Reviews Ready for easy deployment.
<br/>
Upon pressing load GenericReviews button - 10 random Reviews from DataBase will be uploaded to server as Reviews.</li>
<li>Delete all reviews </li>
</ol>
</li>

<br/>
<br/>

##### Written with <3




