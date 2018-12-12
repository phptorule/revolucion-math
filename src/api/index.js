import Vue from 'vue'
import toastr from 'toastr'
import CONFIG from '../../env.config'
import VueCookies from 'vue-cookies'

const responseHandler = (response, err) => {
    if (response.data.message) {
        // toastr.success(response.data.message);
    }

    return new Promise((resolve, reject) => {
        resolve(response.data);
    });
}

const errorHandler = (error) => {
    
    if (error.response.data.message) {
        // toastr.error(error.response.data.message);
    }

    let errors = error.response.data.errors;

    if (errors) {
        let error,
            message;

        for(var e in errors) {
            error = errors[e].pop();
            message = Object.values(error).pop();
            // toastr.error(e + ": " + message);
        }
    }

    return new Promise((resolve, reject) => {
        resolve(response.data);
    });
}

export default {
    getAllAreas() {
        return Vue.axios.get(CONFIG.API_URL + 'areas')
            .then(responseHandler)
            .catch(errorHandler)
    },
    getArea(slug) {
        return Vue.axios.get(CONFIG.API_URL + 'areas/' + slug + '/slug')
            .then(responseHandler)
            .catch(errorHandler)
    },
    getSubject(slug) {
        return Vue.axios.get(CONFIG.API_URL + 'subject/' + slug + '/slug')
            .then(responseHandler)
            .catch(errorHandler)
    },
    getTree(id) {
        return Vue.axios.get(CONFIG.API_URL + 'tree/' + id)
            .then(responseHandler)
            .catch(errorHandler)
    },
    register(form, role) {
        let url = CONFIG.API_URL;
        url += role ? role +  '/register' : 'register'
        return Vue.axios.post(url, {...form})
            .then(responseHandler)
            .catch(errorHandler)
    },
    registerTeacher(form) {
        let url = CONFIG.API_URL;
        url += 'register/teacher'
        return Vue.axios.post(url, {...form})
            .then(responseHandler)
            .catch(errorHandler)
    },
    registerTeacherClass(form) {
        let url = CONFIG.API_URL;
        url += 'register/teacher/class'
        return Vue.axios.post(url, {...form})
            .then(responseHandler)
            .catch(errorHandler)
    },
    login(form) {
        return Vue.axios.post(CONFIG.API_URL + 'login', {...form})
            .then(responseHandler)
            .catch(errorHandler)
    },
    info() {
        return Vue.axios.get(CONFIG.API_URL + 'info')
            .then(responseHandler)
            .catch(errorHandler)
    },
    confirm(data) {
        return Vue.axios.post(CONFIG.API_URL + 'paid/confirm', {...data})
            .then(responseHandler)
            .catch(errorHandler)
    },
    checkMe() {
        return Vue.axios.get(CONFIG.API_URL + 'check')
            .then(responseHandler)
            .catch(errorHandler)
    },

    // Result

    getResult(id) {
        return Vue.axios.get(CONFIG.API_URL + 'result/' + id)
            .then(responseHandler)
            .catch(errorHandler)
    },
    createAreaTestResult(params) {
        return Vue.axios.put(CONFIG.API_URL + 'area-test/status/' + params.user + '/' + params.area, {'status' : 1})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createAreaTestResultStep(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/area-test', {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id, {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createQuizResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/quiz', {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createMiniResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/mini', {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createFourProblemResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/four-problem', {...fields})
        .then(responseHandler)
        .catch(errorHandler)
    },
    createSpeedChallengeResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/speed-challenge', {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },
    createSpeedChallengeProblemResult(id, fields) {
        return Vue.axios.post(CONFIG.API_URL + 'result/' + id + '/speed-challenge-problem', {...fields})
            .then(responseHandler)
            .catch(errorHandler)
    },

    // Mini Test

    getMiniTests() {
        return Vue.axios.get(CONFIG.API_URL + 'mini-test')
            .then(responseHandler)
            .catch(errorHandler)
    },

    getMiniTest(slug) {
        return Vue.axios.get(CONFIG.API_URL + 'mini-test/' + slug + '/slug')
            .then(responseHandler)
            .catch(errorHandler)
    },

    getPuzzle(id) {
        return Vue.axios.get(CONFIG.API_URL + 'puzzle/' + id)
        .then(responseHandler)
        .catch(errorHandler)
    },

    getPuzzleSiblings(id) {
        return Vue.axios.get(CONFIG.API_URL + 'puzzle/siblings/' + id)
        .then(responseHandler)
        .catch(errorHandler)
    },

    saveSession(data) {
        return Vue.axios.post(CONFIG.API_URL + 'session', data)
    },

    // Speed Challenge
    
    getSpeedChallenge(id) {
        return Vue.axios.get(CONFIG.API_URL + 'speed-challenge/' + id)
        .then(responseHandler)
        .catch(errorHandler)
    },

    addPointSpeedChallenge(params) {
        let {user, speed_challenge_id, points} = params
        return Vue.axios.get(`${CONFIG.API_URL}speed-challenge/points/${user}/${speed_challenge_id}/${points}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    addPointMiniTest(params) {
        let {user, mini, points} = params
        return Vue.axios.get(`${CONFIG.API_URL}mini-test/points/${user}/${mini}/${points}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    // Demo

    createDemoUser(form) {
        return Vue.axios.post(CONFIG.API_URL + 'demo/register', {...form})
            .then(responseHandler)
            .catch(errorHandler)
    },

    // School

    getSchool() {
        return Vue.axios.get(CONFIG.API_URL + 'school')
            .then(responseHandler)
            .catch(errorHandler)
    },

    getTeacherSchool() {
        return Vue.axios.get(CONFIG.API_URL + `school/teacher`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getAreaTest(slug) {
        return Vue.axios.get(CONFIG.API_URL + 'area-test/' + slug + '/slug')
            .then(responseHandler)
            .catch(errorHandler)
    },

    getAreaTests() {
        return Vue.axios.get(CONFIG.API_URL + 'area-test')
            .then(responseHandler)
            .catch(errorHandler)
    },

    addPointAreaTest(params) {
        let {user, area, points} = params
        return Vue.axios.get(`${CONFIG.API_URL}area-test/points/${user}/${area}/${points}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getRequirments(subject_id) {
        return Vue.axios.get(CONFIG.API_URL + 'area-test/requirments/' + subject_id)
            .then(responseHandler)
            .catch(errorHandler)
    },

    //Class
    getClasses() {
        return Vue.axios.get(`${CONFIG.API_URL}class`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getClass(classId) {
        return Vue.axios.get(`${CONFIG.API_URL}class/${classId}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getAvailableClass(schoolId) {
        return Vue.axios.get(`${CONFIG.API_URL}class/available/${schoolId}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getTeacherClasses(teacherId) {
        return Vue.axios.get(`${CONFIG.API_URL}class/teacher/${teacherId}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    getClassStudents(classId, sessionId) {
        const session = sessionId ? `/${sessionId}` : ''
        return Vue.axios.get(`${CONFIG.API_URL}class/students/${classId}${session}`)
            .then(responseHandler)
            .catch(errorHandler)
    },

    // Answer Texts

    getAllAnswerTexts() {
        return Vue.axios.get(CONFIG.API_URL + 'answer-text')
    },

    // Validate

    checkUnique: data =>
    (
        Vue.axios.post(CONFIG.API_URL + 'rules/exist', data)
        .then( res => ({valid: true}), error => ({valid: false}) )
    ),

    checkCode: data =>
    (
        Vue.axios.post(CONFIG.API_URL + 'rules/code/school', data)
        .then( res => ({valid: true}), error => ({valid: false}) )
    ),

    getLastCompleteSubject() {
        return Vue.axios.get(CONFIG.API_URL + 'users/get-last-complete-subject')
            .then(responseHandler)
            .catch(errorHandler)
    },

    getRankingByArea(area) {
        return Vue.axios.get(CONFIG.API_URL + 'ranking/' + area)
            .then(responseHandler)
            .catch(errorHandler)
    },
}