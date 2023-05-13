/**
 ** Constants messages for NotFoundException
 */
export const NFE = {
  /* Auth */
  NOT_RESET_TOKEN: 'This user has no password change process',
  /* User */
  NOT_USER: 'Cannot find user',
  NOT_USER_BY: 'Cannot find user by this =>',
  /* Avatar */
  NOT_AVATAR_BY: 'Cannot find avatar by this =>',
  NOT_AVATARS: 'Cannot find avatars',
  /* Inventory */
  NOT_INVENTORY_BY: 'Cannot find inventory by this =>',
  NOT_INVENTORIES: 'Cannot find inventories',
  /* Finance */
  NOT_FINANCE_BY: 'Cannot find finace registered by this =>',
  NOT_FINANCES: 'Cannot find finances',
};

/**
 ** Constants messages for UnprocessableEntityException
 */
export const UEE = {
  USER_UNVERIFY: 'This user is not active',
  ENTITY_PROCESS: 'Error in information provided',
  NOT_UPDATE_USER: 'An error occurred updating the user',
};

/**
 ** Constants messages for UnauthorizedException
 */
export const UAE = {
  UNAUTHORIZED: 'Check your credentials',
};

/**
 ** Constants messages for BadRequestException
 */
export const BRE = {
  NOT_CURRENT_PASSWORD: 'Current password does not match',
};

/**
 ** Constants messages for ConflictException
 */
export const CFE = {
  NOT_SAVE_TOKEN: 'Can not save users token',
};

/**
 ** Constants messages for InternalServerErrorException
 */
export const ISE = {
  USER_NOT_CREATED: 'User cannot be created',
};
