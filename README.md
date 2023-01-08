# Mailer Machine

## How to run?

**Make sure you already installed Node**  


## Steps

### 1. Install Required Packages
Use either of the following commands to install the required packages:


```yarn install --force```

or 

```npm add .```

### 2. Set Up Environment Variables
Create a file named .env and include your email credentials as follows:

```
EMAIL=example@example.com
PASSWORD=example-password
CUSTOM_MAIL_NAME=example (optional)
```
Note: If you are using Gmail as your mail provider, you should use an application password to avoid errors.

### 3. Set Up Mail Content and Recipient List
#### Mail content
> Insert your mail content in the content.js file. You can use either HTML or plain text email.
#### Recipient list
> Create a .csv file with a list of recipients in the following format:

```
email,name
example@gmail.com,example name
```

### 4. Run the Tool
Use one of the following commands to run the tool:


```node server.js --csvFile={nameOfRecipientListFile}.csv --isHtmlMail={boolean}```

or

```yarn run text```

or 

```yarn run html```

### Note
- Limitation for email quantity sending per day is depended on mail provider you using.