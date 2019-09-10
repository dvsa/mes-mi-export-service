
import { formatIpadIssueReason, formatRekeyReason } from '../rekey-reason-mapper';
import { RekeyReason } from '@dvsa/mes-test-schema/categories/B';

describe('rekey reason mapper', () => {
  describe('formatIpadIssueReason', () => {
    it('should return null when rekeyReason does not exist', () => {
      const rekeyReason = null;
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBeNull();
    });

    it('should return null when ipadIssue does not exist', () => {
      const rekeyReason: RekeyReason = {};
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBeNull();
    });

    it('should return technical fault as an iPad issue', () => {
      const rekeyReason: RekeyReason = {
        ipadIssue: {
          technicalFault: true,
        },
      };
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBe('technical fault');
    });

    it('should return lost as an iPad issue', () => {
      const rekeyReason: RekeyReason = {
        ipadIssue: {
          lost: true,
        },
      };
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBe('lost');
    });

    it('should return stolen as an iPad issue', () => {
      const rekeyReason: RekeyReason = {
        ipadIssue: {
          stolen: true,
        },
      };
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBe('stolen');
    });

    it('should return broken as an iPad issue', () => {
      const rekeyReason: RekeyReason = {
        ipadIssue: {
          broken: true,
        },
      };
      const result = formatIpadIssueReason(rekeyReason);
      expect(result).toBe('broken');
    });
  });

  describe('formatRekeyReason', () => {
    it('should return null if rekey reason does not exist', () => {
      const rekeyReason = null;
      const result = formatRekeyReason(rekeyReason);
      expect(result).toBeNull();
    });

    it('should return Transfer when transfer was selected as reason', () => {
      const rekeyReason: RekeyReason = {
        transfer: {
          selected: true,
        },
      };
      const result = formatRekeyReason(rekeyReason);
      expect(result).toBe('Transfer');
    });

    it('should return iPad issue when iPad issue was selected as reason', () => {
      const rekeyReason: RekeyReason = {
        ipadIssue: {
          selected: true,
        },
      };
      const result = formatRekeyReason(rekeyReason);
      expect(result).toBe('iPad issue');
    });

    it('should return Other when other was selected as reason', () => {
      const rekeyReason: RekeyReason = {
        other: {
          selected: true,
        },
      };
      const result = formatRekeyReason(rekeyReason);
      expect(result).toBe('Other');
    });

    it('should return Transfer|iPad issue|Other when all three reasons has been selected', () => {
      const rekeyReason: RekeyReason = {
        transfer: {
          selected: true,
        },
        ipadIssue: {
          selected: true,
        },
        other: {
          selected: true,
        },
      };
      const result = formatRekeyReason(rekeyReason);
      expect(result).toBe('Transfer|iPad issue|Other');
    });
  });
});
