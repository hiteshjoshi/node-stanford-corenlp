Automatic Hashtag Generator Using  POS and NER From Stanford NLP  via NodeJS
===================

Automatically generate tags to be associated with articles and social media items by extracting all nouns from the title and using them as tags. 

Titles of articles usually contain the relevant places, persons, locations and other nouns that would be ideal for tagging articles. In the case where there are no tags associated with an article this is a good start to generate suitable hashtags

*tags and hashtags will be used interchangeably 

----------
Setup
-------------
Configuring the environment.

> **Stanford CoreNLP and Java is Required ** 

> - Get it here [Stanford CoreNLP Download](http://nlp.stanford.edu/software/stanford-corenlp-full-2014-06-16.zip).
> - Use Java 1.8


#### <i class="icon-file"></i> Install node-stanford-simple-nlp

    npm install stanford-corenlp

For more information visit the repo [node-stanford-corenlp](https://github.com/hiteshjoshi/node-stanford-corenlp)

#### <i class="icon-file"> Clone the repository

    git clone 


#### <i class="icon-file"> Start the tag_generator

    node tag_generator.js

#### <i class="icon-file"> Send a few HTTP request with  title of article as  payload

     curl  -L  http://127.0.0.1:8990/ --data '{"title":"Arda Turan dons FC Barcelona colours for presentation in Camp Nou"}'
     

#### <i class="icon-file"> Nouns & Named Entities returned from server
   ```
{
"nouns":["Arda","Turan","FC","Barcelona","colours","presentation","Camp","Nou"],
"ne":["Arda","Turan","FC","Barcelona"]
}
```


> **Tip:** As you can see from the above results. Nouns(nouns) usually contains noise since they will have words such as "presentation", "colours" that we might not want to use as hashtags and the named entities(ne) contain a much more cleaner and relevant list of terms.
> 
> However there might be causes when NER fails to capture the relevant tags and as a result it might be best to use a backoff strategy where you prioritize tags from NER  only using nouns from POS if NER fails. 

