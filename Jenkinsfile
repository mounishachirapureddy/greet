pipeline {
    agent any
    
   
    stages {
        stage('cloning git') {
            steps {
                script {
                    // Replace the repository URL with your Git repository URL
                    git 'https://github.com/mounishachirapureddy/greet.git'
                }
            }      
        }  

        

        stage('Create Docker Images') {
            steps {
                dir('frontend') {
                    sh 'npm install dotenv'
                    sh 'docker build -t frontend  .'
                }
                dir('backend/Custom-Management') {
                    sh 'npm install dotenv'
                    sh 'docker build -t custom-management .'
                }
                dir('backend/Email-sender') {
                    sh 'npm install dotenv'
                    sh 'docker build -t email-sender .'
                }
                dir('backend/Scheduler') {
                    sh 'npm install dotenv'
                    sh 'docker build -t scheduler  .'
              
                }
                dir('backend/greetings-manager') {
                    sh 'npm install dotenv'
                    sh 'docker build -t greetings-manager  .'
                }
                dir('backend/whatsapp-sender') {
                    sh 'npm install dotenv'
                    sh 'docker build -t whatsapp-sender .'
                }
            }
        }
       

        stage('Deploy Snappcoins Services') {
            steps {
                dir('frontend') {
                    sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f frontend.yaml"
                   
                }
                dir('backend/Custom-Management') { 
                    sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f  custom-management.yaml"
                    
                   
                }
                dir('backend/Email-sender') {
                     sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f  email-sender.yaml"
                   
                }
                dir('backend/Scheduler') {
                     sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f scheduler.yaml"
                   
                }
                dir('backend/greetings-manager') {
                     sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f greetings-manager.yaml"

                }
                dir('backend/whatsapp-sender') {
                     sh "export KUBECONFIG=/new/directory/path/config"
                         sh "aws eks update-kubeconfig --name greetings --region ap-south-1"
                    sh "kubectl apply -f whatsapp-sender.yaml"
                  
                }
            }
        }
    }
}
