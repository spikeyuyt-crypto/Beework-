export const toAdminUserForm = (user = {}) => ({
    userCd: user.userCd ?? user.userCD ?? user.id ?? "",
    mail: user.mail ?? user.userMail ?? "",
    tel: user.tel ?? user.userTel ?? "",
    firstName: user.firstName ?? "",
    firstNameKana: user.firstNameKana ?? "",
    lastName: user.lastName ?? "",
    lastNameKana: user.lastNameKana ?? "",
    sex: user.sex ?? "",
    photoAddress: user.photoAddress ?? user.userPhoto ?? "",
    authority: user.authority ?? "",
    userStatus: user.userStatus ?? "",
    countryZip: user.countryZip ?? user.phoneCountryCode ?? "",
});
