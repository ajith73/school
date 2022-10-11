
/**
 * @param {string} "id" - id should be unique for all the files. U - Unit, M - Module, L - Lesson.
 * If a build / zip (file) is for the lesson which consists of both module and lesson then the id should contain all the sections.
 * If a build / zip (file) is only for the module, the id should not have any mention of the lesson parameter. (Ex: '01U_01M')
 * If a build / zip (file) is only for the lessson, the id shuld not have any mention of the module. (Ex: '01U_01L')
 *
*/

var fileMetadata = {
    unitNumber: 1,
    moduleNumber: 1,
    unitName: 'Whole Numbers, Expressions, and Volume',
    moduleName: 'Whole Number Place Value and Multiplication',
    id: '01U_01M'
};