pipeline {
    options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '4'))
    }

    agent any

    environment {    
        ECR_REGION = 'ap-south-1'
        ECR_REGISTRY = '083118395813.dkr.ecr.ap-south-1.amazonaws.com'
        KUBECONFIG_PATH = '/new/directory/path/config'
          VERSION = 'v1.0'
    }

    stages {
        stage('Configure AWS') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'f457fa0c-671e-4380-a0fc-a931d9f7d87c']]) {
                        sh 'aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
                        sh 'aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'
                        sh 'aws configure set region ap-south-1'
                    }
                }
            }
        }
        stage('Terraform Init') {
            steps {
               sh 'terraform init'                      
            }
        }

        stage('Terraform Validate') {
            steps {
                sh 'terraform validate'                
            }
        }

        stage('Terraform Plan') {
            steps {
                sh 'terraform plan'
            }
        }

        stage('Terraform Apply') {
            steps {
                sh 'terraform apply -var="environment_name=qa" -auto-approve'
            }
        }
        
       
       stage('Initialize Variables') {
            steps {
                script {
                    DOCKER_IMAGE_NAMES = ['frontend', 'custom-management', 'email-sender', 'scheduler', 'greetings-manager' , 'whatsapp-sender']
                }
            }
        }
     
       
         stage('Create Docker Images') {
            steps {
                dir('frontend') {
                    sh 'npm install dotenv'
                    sh 'docker build -t frontend:${VERSION}-${BUILD_NUMBER} .'     
                }
                dir('backend/Custom-Management') {
                    sh 'npm install dotenv'
                    sh 'docker build -t custom-management:${VERSION}-${BUILD_NUMBER} .'
                }
                dir('backend/Email-sender') {
                    sh 'npm install dotenv'
                    sh 'docker build -t email-sender:${VERSION}-${BUILD_NUMBER} .'
                }
                dir('backend/Scheduler') {
                    sh 'npm install dotenv'
                    sh 'docker build -t scheduler:${VERSION}-${BUILD_NUMBER}  .'
                }
                dir('backend/greetings-manager') {
                    sh 'npm install dotenv'
                    sh 'docker build -t greetings-manager:${VERSION}-${BUILD_NUMBER}  .'
                }
                dir('backend/whatsapp-sender') {
                    sh 'npm install dotenv'
                    sh 'docker build -t whatsapp-sender:${VERSION}-${BUILD_NUMBER} .'
                }
            }
        }
       
        stage('Authenticate with ECR') {
            steps {
                script {
                    def ecrLogin = "aws ecr get-login-password --region ${ECR_REGION}"
                    def ecrLoginCommand = "${ecrLogin} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    sh ecrLoginCommand
                }
            }
        }

        stage('Push Docker Images to ECR') {
            steps {
                // Push Docker images to ECR
                script {
                     DOCKER_IMAGE_NAMES.each { imageName ->
                    withDockerRegistry(url: "https://${ECR_REGISTRY}/${imageName}:${VERSION}") {
                    sh "docker tag ${imageName}:${VERSION}-${BUILD_NUMBER} ${ECR_REGISTRY}/${imageName}:${VERSION}-${BUILD_NUMBER}"
                    sh "docker push ${ECR_REGISTRY}/${imageName}:${VERSION}-${BUILD_NUMBER}"
                }
                }
                }

            }
        }
        
       stage('Deploy Snappcoins Services') {
            steps {
                sh 'kubectl apply -f virtual-service.yaml'
                dir('frontend') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f frontend.yaml"
                    sh "kubectl set image deployments/frontend-deployment frontend-service=${ECR_REGISTRY}/frontend:${VERSION}-${BUILD_NUMBER}" 
                }
                dir('backend/Custom-Management') { 
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f  custom-management.yaml"
                    sh "kubectl set image deployments/custom-management-deployment custom-management-service=${ECR_REGISTRY}/custom-management:${VERSION}-${BUILD_NUMBER}" 
                }
                dir('backend/Email-sender') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f  email-sender.yaml"
                    sh "kubectl set image deployments/email-sender-deployment email-sender-service=${ECR_REGISTRY}/email-sender:${VERSION}-${BUILD_NUMBER}"
                }
                dir('backend/Scheduler') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f scheduler.yaml"
                    sh "kubectl set image deployments/scheduler-deployment scheduler-service=${ECR_REGISTRY}/scheduler:${VERSION}-${BUILD_NUMBER}"   
                }
                dir('backend/greetings-manager') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f greetings-manager.yaml"
                    sh "kubectl set image deployments/greetings-manager-deployment greetings-manager-service=${ECR_REGISTRY}/greetings-manager:${VERSION}-${BUILD_NUMBER}"

                }
                dir('backend/whatsapp-sender') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                    sh "aws eks update-kubeconfig --name qa-messaging-cluster --region ap-south-1"
                    sh "kubectl apply -f whatsapp-sender.yaml"
                    sh "kubectl set image deployments/whatsapp-sender-deployment whatsapp-sender-service=${ECR_REGISTRY}/whatsapp-sender:${VERSION}-${BUILD_NUMBER}"                  
                }
            }
        }

        
            stage('Print Ingress IP') {
            steps {
            script {
                def externalIP = sh(script: 'kubectl get svc istio-ingressgateway -n istio-system -o jsonpath="{.status.loadBalancer.ingress[0].hostname}"', returnStdout: true).trim()

                echo "Ingress Gateway External IP: ${externalIP}"
        }
    }
            
    }
    

        stage('Conditional Job Trigger') {
            steps {
                script {
                    // Add your condition here
                    def shouldTriggerNextJob = input(
                        id: 'triggerConfirmation',
                        message: 'Do you want to trigger the next job?',
                        parameters: [
                            [$class: 'BooleanParameterDefinition', defaultValue: false, description: 'Proceed with triggering?', name: 'TRIGGER']
                        ]
                    )

                    if (shouldTriggerNextJob) {
                        build job: 'qa', wait: false
                    } else {
                        echo 'Not triggering the next job.'
                    }
                }
            }
        }
    }
   post {
        always {
            script {
                // Ask for user confirmation before destroying Terraform resources
                def userInput = input(
                    id: 'destroyConfirmation',
                    message: 'Do you want to destroy Terraform resources?',
                    parameters: [
                        [$class: 'BooleanParameterDefinition', defaultValue: false, description: 'Proceed with destruction?', name: 'CONFIRM']
                    ]
                )

                if (userInput) {
                    
                    // If user confirms, destroy Terraform resources
                    sh 'terraform destroy -var="environment_name=dev" --auto-approve'
                                        //echo 'Sleeping for 25 minutes...'
                    //sleep(time: 25 * 60)  // 25 minutes in seconds

                } else {
                    echo 'Skipping Terraform destruction.'
                }
            }
        }
    }
}
