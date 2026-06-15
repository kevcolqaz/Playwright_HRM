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
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          powershell 'npm run test'
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'artifacts/test-results/junit-results.xml'
          archiveArtifacts artifacts: 'artifacts/playwright-report/**, artifacts/allure-results/**, artifacts/test-results/**', fingerprint: true
        }
      }
    }

    stage('Run BrowserStack Matrix') {
      when {
        expression { return env.BROWSERSTACK_USERNAME?.trim() && env.BROWSERSTACK_ACCESS_KEY?.trim() }
      }
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          powershell 'npm run test:browserstack'
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'artifacts/test-results/junit-results.xml'
          archiveArtifacts artifacts: 'artifacts/allure-results/**, artifacts/test-results/**', fingerprint: true
        }
      }
    }

    stage('Generate Allure Report') {
      steps {
        powershell 'npm run report:allure'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'artifacts/**, auth/storageState.json, auth/auth-setup-error.*', fingerprint: true
    }
  }
}
