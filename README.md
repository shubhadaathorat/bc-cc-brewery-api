# CodeChallenge NEST-JS Serverless Lambda APIs

This project was generated with [NEST-JS CLI](https://docs.nestjs.com/cli/overview) version 9.0.0. Please follow the below steps to clone, run, build, and deploy this project

## Step 1 -  Installation of pre-requisites on your machine

Install NodeJS on your machine with version 16.x and above using this website and as per your device OS [NodeJS](https://nodejs.org/en/download/)

Run `npm install -g npm@latest` to install npm on your machine globally

Run `npm install -g typescript` to install typescript on your machine globally

Run `npm install -g @nestjs/cli` to install the nestjs cli globally in your machine

Run `npm install -g serverless` to install the serverless globally in your machine
## Step 2 -  Clone the code using the below commands and install dependencies

Clone this repository using the below command `git clone -b master [git@github.com:shubhadaathorat/bc-cc-brewery-api.git]` copy the git URL from the repo if the repository name is different

Important step - Open the terminal on your machine and navigate to the root folder of the project using `cd path_to_project_root_folder`

Run `npm install` to install all the project dependencies.

## Step 3 - Run and serve the application locally using serverless offline

Important step - Open the terminal on your machine and navigate to the root folder of the project using `cd path_to_project_root_folder`

Run `npm run build` for a local server. This generates the build under the `dist/` directory under the project folder

Run `sls offline start`. This starts the lambda functions to run locally 

Now the APIs can be accessed via `ANY | http://localhost:3000/{proxy*}` using the postman client app or any other API clients

To Stop the execution navigate to the terminal and enter `ctrl+C` then type `Y` to stop the code execution locally

## Step 4 - Build and Deploy the application to production - AWS LAMBDA functions

Important step - Open the terminal on your machine and navigate to the root folder of the project using `cd path_to_project_root_folder`

Make sure the `dist/` is deleted from the project folder

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory under the project folder.

### Setup AWS CLI configuration

Open terminal and run the below commands. Refer link for more details [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

```bash
aws configure
AWS Access Key ID [None]: your_iamuser_access_key
AWS Secret Access Key [None]: your_iamuser_secret_key
Default region name [None]: us-west-2
Default output format [None]: json
```

Run `sls deploy` OR `serverless deploy` 

Shortly, you'll get an auto-generated URL which you can use to hit the API so feel free to test it by adding, listing, and removing songs. You can see logs and monitor how your app performs in the built-in dashboards on Lambda & CloudWatch services on AWS Management Console.

## Step 5 - Deploy the build to AWS - S3 bucket will have the static build and CDN will be serving the contents of the S3 bucket

### Setup S3 bucket

Create a new S3 bucket with public access and enable the static website hosting setting. Follow steps 1 to 4 only mention on this link [S3-bucket-setup](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)

After Step 4 above - Navigate to the build folder `dist/` generated above in Step 4 and upload all the files under the `dist/project_name` folder to the S3 bucket using the AWS console for S3.

### Setup CDN and point to the above S3 bucket

Create a CDN distribution using the steps mentioned on this link [CDN-setup](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-creating-console.html)

Navigate to the CDN - distribution which we have created in the above step 

#### Select the General -> Settings (Edit) and make sure the below settings are set

`Default root object - optional  = index.html` Save changes

#### Select the Origin -> Select the entry under Origins and hit (Edit) and make sure the below settings are set

Origin domain - make sure this is pointing to your S3 bucket created above -> Save Changes if any change is made here. Keep other values as is

#### Select the Behaviour -> Select the entry under Behaviours and hit (Edit) and make sure the below settings are set


Origin and origin groups - Pointing to the S3 bucket 

Viewer protocol policy - Select GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE

Under Cache key and origin requests set below values

Cache policy - CachingOptimized

Origin request policy - optional  - CORS-CustomOrigin

Save Changes if any

## Boom application is now hosted LIVE

Navigate to your CDN distribution and copy the value of the Distribution domain name and paste is it the browser

You should now be able to access the angular application via CDN

## CI/CD Pipeline implemented using AWS Code Build

Please refer to the document for complete details of this setup.

When code is pushed to the `master` branch it will trigger a build to AWS Code build and the entire build and deployment process will be automated.

`Note` - S3 and CDN have to be still created manually using the above steps for the current setup. This can also be automated in the future using Terraform scripts
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## License

[APACHE v2.0](https://www.apache.org/licenses/LICENSE-2.0)