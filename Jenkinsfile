pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t app .'
            }
        }

        stage('Push to ECR') {
            steps {
                sh 'docker push <ecr-repo>'
            }
        }

        stage('Deploy') {
            steps {
                sh 'deploy to ECS'
            }
        }
    }
}
