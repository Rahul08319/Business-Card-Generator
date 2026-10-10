/**
 * Automatic Year Manager
 * Ensures business cards, copyright notices, and metadata stay current
 * automatically across all coming years without manual intervention.
 */

export const getCurrentYear = (): number => {
    return new Date().getFullYear();
};

export const getCardIssueYear = (customYear?: number): number => {
    return customYear ?? getCurrentYear();
};

export const getCardValidThruYear = (issueYear?: number, durationYears: number = 3): number => {
    const baseYear = issueYear ?? getCurrentYear();
    return baseYear + durationYears;
};

export const getValidityBadgeText = (issueYear?: number, validThruYear?: number): string => {
    const issued = issueYear ?? getCurrentYear();
    const valid = validThruYear ?? (issued + 3);
    return `ISSUED ${issued} • VALID THRU ${valid}`;
};

export const getCopyrightNotice = (startYear: number = 2024): string => {
    const current = getCurrentYear();
    if (current <= startYear) {
        return `© ${startYear} Business Card Studio`;
    }
    return `© ${startYear}–${current} Business Card Studio`;
};

export const getNextAutoUpdateDate = (): string => {
    const nextYear = getCurrentYear() + 1;
    return `Jan 1, ${nextYear}`;
};
