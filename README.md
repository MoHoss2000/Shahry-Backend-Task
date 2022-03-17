# Shahry Backend Task

## Project Description

This is an implementation of an Egyptian national ID validator and data-extractor API using NodeJS/ Express

## Getting started

Running the project is pretty straightforward. Just clone the repo and install the required modules:
```sh
npm i
```

and run the project:

```sh
node app
```

## Packages

- [moment] - A Node.js package for data validation
- [Express] - Node.js framework for creating servers and APIs

## API Reference

#### National id validation

```http
  GET /api/${id_number}
```

Validate id number and get info about it
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `id_number` | `string` | _Required_. 12 digit national id number |


| Sample Request | Sample Response | Status code | Description
| :-------- | :------- | :------------------------- | :-------------------------
| api/32202280102153 | ![image](https://user-images.githubusercontent.com/61802989/158876620-35ef1da7-9854-4b06-aa67-3295025320e8.png) | 200 | Valid id -> info returned
| api/3220228 | ![image](https://user-images.githubusercontent.com/61802989/158876950-85421fc2-76e6-4e6f-8bb3-f9a06f0a4570.png) | 400 | ID should be 12 characters
| api/32202280102ada | ![image](https://user-images.githubusercontent.com/61802989/158877339-c91be501-b22f-443f-9c26-f6318dbfac25.png) | 400 | ID should only contain digits
| api/30002300102153 | ![image](https://user-images.githubusercontent.com/61802989/158877528-17ecd80c-9b1c-4371-9e88-b9db2f4bfd17.png) | 400 | 30/02/2000 was not a valid date
| api/30004075002145 | ![image](https://user-images.githubusercontent.com/61802989/158877727-3297c824-a7f6-4291-b82f-6859b5d55a9a.png) | 400 | 50 is not a valid birth location code


## Notes

The API endpoint was created in a 'piplelined' fashion using express middlewares where the task was divided to several stages and if a stage was successful, data is concatenated to an object in the request and the next middleware is called. If any error occurs in any of the stages, status 400 is sent to the client and no other middlewares are called.

In order to be able to get the person's birth location I had to have a dictionary matching the code in the id to the correponding governorate. I wanted to created a JSON file with the code as key and location as value for easy access. However, copying data manually for 35 locations and having to deal with english and arabic characters was time consuming. So I followed the following steps:

- Copied the list of locations from this article http://www.alsbbora.info/show.aspx?id=404288
- Imported it in Excel using 'spaces' as delimiters to get the data on seperate columns
- Had to manually adjust the locations with 2 words as they were on 2 seperate columns (like كفر الشيخ)
- Saved the file as CSV
- Uploaded the CSV to this site https://www.convertcsv.com/csv-to-json.htm and wrote my template to get the JSON file I wanted (data.json)


## References

http://www.alsbbora.info/show.aspx?id=404288 <br/>
https://www.convertcsv.com/csv-to-json.htm <br/>
https://ar.wikipedia.org/wiki/%D8%A8%D8%B7%D8%A7%D9%82%D8%A9_%D8%A7%D9%84%D8%B1%D9%82%D9%85_%D8%A7%D9%84%D9%82%D9%88%D9%85%D9%8A_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9 <br/>

