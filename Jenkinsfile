// NAS 안의 Jenkins 가 GitHub 을 폴링한다 (인바운드 포트 불필요).
pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Build') {
            steps {
                // Next.js 는 빌드가 곧 테스트다. 타입 에러/import 에러가 여기서 잡힌다.
                sh 'docker build -t gongmojun-frontend:latest .'
            }
        }

        stage('Deploy') {
            steps {
                // compose 파일은 백엔드 레포에 있다. NAS 의 배포 경로를 지정한다.
                // BACKEND_DEPLOY_DIR 은 Jenkins 잡의 환경변수로 설정한다.
                sh '''
                    cd "${BACKEND_DEPLOY_DIR:-/volume1/docker/gongmojun}"
                    docker compose up -d --no-deps frontend
                '''
            }
        }
    }

    post {
        success {
            sh '''
                for i in $(seq 1 10); do
                    if curl -fsS -o /dev/null http://localhost:3000; then
                        echo "frontend 응답 확인"
                        exit 0
                    fi
                    sleep 3
                done
                echo "frontend 응답 없음"
                exit 1
            '''
        }
        failure {
            sh 'docker logs --tail=50 gongmojun-frontend || true'
        }
    }
}
