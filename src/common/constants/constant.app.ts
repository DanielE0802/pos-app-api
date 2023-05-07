/* Setting value of the string. */
export const APP_GLOBAL_UUID = {
  PERSONAL_ZONE: 'c0fdb60e-09f8-11ed-8edd-d8c497214dcf',
  STUDENT_ROLE_NAME: 'student',
};

/* Setting the initial amount of coins to 4000. */
export const INIT_COIN_FINANCE = {
  snip: 'universum_coin',
  name: 'Moneda Universum',
  amount: 4000,
};

/* Setting the initial amount of coins to 4000. */
export const INIT_INVENTORY = {
  snips: [
    'carrot_seed',
    'papaya_seed',
    'avocado_seed',
    'watermelon_seed',
    'blackberry_seed',
  ],
  init_amount: 10,
};

/* The possible values that a transaction can have are defined */
export const TRANSACTION = {
  approved: 'approved',
  pending: 'pending',
  canceled: 'canceled',
};

/* All Metaverse and Information System Roles */
export const ROLES = {
  admin: 'admin',
  coordinator: 'coordinator',
  parent: 'parent',
  rector: 'rector',
  secretary: 'secretary',
  student: 'student',
  support: 'support',
  teacher: 'teacher',
  township: 'township',
};

/* All Metaverse and Information System Roles segregated by platform */
export const ROLES_GROUP = {
  universum: [ROLES.student, ROLES.teacher],
  si: [
    ROLES.admin,
    ROLES.coordinator,
    ROLES.parent,
    ROLES.rector,
    ROLES.secretary,
    ROLES.support,
    ROLES.township,
  ],
};
