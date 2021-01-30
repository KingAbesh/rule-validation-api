# Rule Validation API

- ##### DEMO - https://validation-rules-api.herokuapp.com/api/v1

- ##### API DOCS - https://documenter.getpostman.com/view/9041223/TW6zF6iN

Could you imagine a more interesting way to handle validation ? Well, be my guest.

You give me the rules and your desired data and I make sure your data conforms to the rules you specify.

There's no catch: That's simply just it :).

Oh, there are rules. Just a few to mention :'(.

- The JSON payload sent must have the structure specified below;

  ```javascript
  {
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 45,
      "successful": 44,
      "failed": 1
    }
  }}
  ```

- You get this as a response.

```javascript
{
  "message": "field missions.count successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions.count",
      "field_value": 45,
      "condition": "gte",
      "condition_value": 30
    }
  }
```

- `missions.count` can be interpreted as `{"missions": { "count": 0 }`}

- More details on rules as applicable to the payload above can be found [here](https://flwat.glitch.me/fulltime.html).

### AVAILABLE ENDPOINTS

```markdown
GET / - Get my profile

- returns: JSON
```

```markdown
POST /validate-rule

- validates a JSON consisting of data and certain rules to validate against.

- required:

  - JSON Payload as specified above.

- returns: JSON
```

### INSTALLATION AND LOCAL SETUP

- Run the command `git clone https://github.com/KingAbesh/rule-validation-api` on your terminal to clone this repo to your current directory.
- Run `yarn` or `npm install` to install all required dependencies.

- Run `yarn build:watch` or `npm run build:watch` to start the typescript compiler in watch mode.

- Run `yarn test` or `npm run test` to run tests.

- Run `yarn start:dev` or `npm run start:dev` to run the project.

- You're all set :D.
