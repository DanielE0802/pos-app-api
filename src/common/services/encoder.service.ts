import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncoderService {
  /**
   * Encodes a password using bcrypt.
   *
   * @param {string} password - The password to encode.
   * @returns {Promise<string>} - A promise that resolves to the encoded password.
   */
  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  /**
   * Checks if a given password matches the encoded password.
   *
   * @param {string} password - The password to check.
   * @param {string} userPassword - The encoded password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
   */
  async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
