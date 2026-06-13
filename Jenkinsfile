pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Install') {
      steps {
        powershell 'npm ci'
      }
    }

    stage('Install Browsers') {
      steps {
        powershell 'npx playwright install --with-deps'
      }
    }

    stage('Run Local Matrix') {
      steps {
        powershell 'npm run test'
      }
      post {
        always {
          archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, test-results/**', fingerprint: true
        }
      }
    }

    stage('Run BrowserStack Matrix') {
      when {
        expression { return env.BROWSERSTACK_USERNAME?.trim() && env.BROWSERSTACK_ACCESS_KEY?.trim() }
      }
      steps {
        powershell 'npm run test:browserstack'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, test-results/**, auth/storageState.json', fingerprint: true
    }
  }
}