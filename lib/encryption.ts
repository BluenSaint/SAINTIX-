import CryptoJS from 'crypto-js'

// Encryption configuration
const ENCRYPTION_ALGORITHM = 'AES'
const KEY_SIZE = 256
const IV_SIZE = 16

// Get encryption key from environment with fallback for development
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY environment variable is required in production')
    }
    // Development fallback - should be replaced with proper key in production
    console.warn('Using development encryption key. Set ENCRYPTION_KEY in production!')
    return 'dev-key-32-chars-long-for-aes256'
  }
  
  if (key.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters long for AES-256')
  }
  
  return key
}

// Encryption functions
export class EncryptionService {
  private static key = getEncryptionKey()

  /**
   * Encrypt sensitive data using AES-256-CBC
   */
  static encrypt(plaintext: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(plaintext, this.key).toString()
      return encrypted
    } catch (error) {
      console.error('Encryption failed:', error)
      throw new Error('Failed to encrypt data')
    }
  }

  /**
   * Decrypt sensitive data
   */
  static decrypt(ciphertext: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(ciphertext, this.key)
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
      
      if (!plaintext) {
        throw new Error('Decryption resulted in empty string')
      }
      
      return plaintext
    } catch (error) {
      console.error('Decryption failed:', error)
      throw new Error('Failed to decrypt data')
    }
  }

  /**
   * Encrypt SSN with additional validation
   */
  static encryptSSN(ssn: string): string {
    // Validate SSN format before encryption
    const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/
    if (!ssnRegex.test(ssn)) {
      throw new Error('Invalid SSN format')
    }
    
    // Normalize SSN (remove dashes) before encryption
    const normalizedSSN = ssn.replace(/-/g, '')
    return this.encrypt(normalizedSSN)
  }

  /**
   * Decrypt and format SSN
   */
  static decryptSSN(encryptedSSN: string): string {
    const decrypted = this.decrypt(encryptedSSN)
    // Format as XXX-XX-XXXX
    return `${decrypted.slice(0, 3)}-${decrypted.slice(3, 5)}-${decrypted.slice(5)}`
  }

  /**
   * Encrypt credit score with validation
   */
  static encryptCreditScore(score: number): string {
    if (score < 300 || score > 850) {
      throw new Error('Credit score must be between 300 and 850')
    }
    return this.encrypt(score.toString())
  }

  /**
   * Decrypt credit score
   */
  static decryptCreditScore(encryptedScore: string): number {
    const decrypted = this.decrypt(encryptedScore)
    const score = parseInt(decrypted, 10)
    
    if (isNaN(score) || score < 300 || score > 850) {
      throw new Error('Invalid decrypted credit score')
    }
    
    return score
  }

  /**
   * Encrypt account number
   */
  static encryptAccountNumber(accountNumber: string): string {
    if (!accountNumber || accountNumber.length < 4) {
      throw new Error('Account number must be at least 4 characters')
    }
    return this.encrypt(accountNumber)
  }

  /**
   * Decrypt account number
   */
  static decryptAccountNumber(encryptedAccountNumber: string): string {
    return this.decrypt(encryptedAccountNumber)
  }

  /**
   * Encrypt dispute letter content
   */
  static encryptDisputeContent(content: string): string {
    if (!content || content.length < 10) {
      throw new Error('Dispute content must be at least 10 characters')
    }
    return this.encrypt(content)
  }

  /**
   * Decrypt dispute letter content
   */
  static decryptDisputeContent(encryptedContent: string): string {
    return this.decrypt(encryptedContent)
  }

  /**
   * Hash sensitive data for searching (one-way)
   */
  static hashForSearch(data: string): string {
    return CryptoJS.SHA256(data + this.key).toString()
  }

  /**
   * Mask sensitive data for display
   */
  static maskSSN(ssn: string): string {
    if (ssn.length === 9) {
      return `XXX-XX-${ssn.slice(-4)}`
    }
    if (ssn.length === 11 && ssn.includes('-')) {
      return `XXX-XX-${ssn.slice(-4)}`
    }
    return 'XXX-XX-XXXX'
  }

  static maskAccountNumber(accountNumber: string): string {
    if (accountNumber.length <= 4) {
      return 'XXXX'
    }
    return 'X'.repeat(accountNumber.length - 4) + accountNumber.slice(-4)
  }

  static maskCreditScore(score: number): string {
    // Don't mask credit scores, but validate range
    if (score < 300 || score > 850) {
      return 'Invalid'
    }
    return score.toString()
  }

  /**
   * Validate encryption key strength
   */
  static validateKeyStrength(): boolean {
    const key = this.key
    
    // Check minimum length
    if (key.length < 32) {
      return false
    }
    
    // Check for complexity (should have uppercase, lowercase, numbers, symbols)
    const hasUpper = /[A-Z]/.test(key)
    const hasLower = /[a-z]/.test(key)
    const hasNumber = /\d/.test(key)
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(key)
    
    return hasUpper && hasLower && hasNumber && hasSymbol
  }

  /**
   * Generate a secure random key (for key rotation)
   */
  static generateSecureKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return result
  }
}

// Utility functions for database operations
export function encryptSensitiveFields(data: any): any {
  const encrypted = { ...data }
  
  if (data.ssn) {
    encrypted.ssn = EncryptionService.encryptSSN(data.ssn)
  }
  
  if (data.creditScore) {
    encrypted.creditScore = EncryptionService.encryptCreditScore(data.creditScore)
  }
  
  if (data.accountNumber) {
    encrypted.accountNumber = EncryptionService.encryptAccountNumber(data.accountNumber)
  }
  
  if (data.disputeContent) {
    encrypted.disputeContent = EncryptionService.encryptDisputeContent(data.disputeContent)
  }
  
  return encrypted
}

export function decryptSensitiveFields(data: any): any {
  const decrypted = { ...data }
  
  try {
    if (data.ssn) {
      decrypted.ssn = EncryptionService.decryptSSN(data.ssn)
    }
    
    if (data.creditScore) {
      decrypted.creditScore = EncryptionService.decryptCreditScore(data.creditScore)
    }
    
    if (data.accountNumber) {
      decrypted.accountNumber = EncryptionService.decryptAccountNumber(data.accountNumber)
    }
    
    if (data.disputeContent) {
      decrypted.disputeContent = EncryptionService.decryptDisputeContent(data.disputeContent)
    }
  } catch (error) {
    console.error('Error decrypting sensitive fields:', error)
    // Return original data if decryption fails to prevent data loss
    return data
  }
  
  return decrypted
}

// Key rotation utilities
export class KeyRotationService {
  /**
   * Rotate encryption key (requires re-encrypting all data)
   */
  static async rotateKey(newKey: string): Promise<void> {
    if (newKey.length < 32) {
      throw new Error('New key must be at least 32 characters long')
    }
    
    // This would require a database migration to re-encrypt all data
    // Implementation would depend on specific database structure
    console.warn('Key rotation requires database migration - implement based on your data structure')
  }
  
  /**
   * Verify key rotation is needed
   */
  static shouldRotateKey(): boolean {
    // Implement logic to check if key rotation is needed
    // Could be based on time, usage, or security events
    return false
  }
}

