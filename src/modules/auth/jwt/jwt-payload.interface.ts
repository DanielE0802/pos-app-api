interface PayloadProfile {
  email: string;
  company: { id: string };
}

export interface IJwtPayload {
  id: string;
  email: string;
  verified: boolean;
  verifyToken: string;
  profile: PayloadProfile;
}
