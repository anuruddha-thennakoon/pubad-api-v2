var constants = {
    version: 'v1',
    appToken: 'DX9343ZXS9JPK5c8ws5ct9G4u3720jTQ5lHwbGJH777GflSQX1',

    // FILE_PATH: '/home/slas-info/actions-runner/pubad-admin/pubad-admin-v2/pubad-admin-v2/dist/uploads',//auto build
    FILE_PATH: '/home/slas-info/App/pubad-admin/uploads',//manual build
    // FILE_PATH: './uploads',//local,

    //Application Types
    ACTING: 1,
    PROMOTION: 2,
    CONFIRMATION: 3,
    TRANSFER: 7,
    APPOINTMENT: 8,

    //User Roles
    ADMIN: '1',
    PUBAD: '2',
    PSC: '3',
    INSTITUTE: '4',
    SLAS_OFFICER: '5',

    //Application View Types
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view',

    //Application Status
    PENDING: 100,
    REJECTED: 101,
    RECOMMENDED_TO_PSC: 200,
    SUBMITTED_TO_COMMISSION: 201,
    RETURNED_BY_PSC: 300,
    APPROVED: 400,
}

module.exports = constants;