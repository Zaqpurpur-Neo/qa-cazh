import * as XLSX from "xlsx";

/**
 * Reads a downloaded Excel file and returns the sheet data as a JSON array.
 *
 * @param {string} filePath - Path to the file inside cypress/downloads (e.g., 'cypress/downloads/export.xlsx')
 * @param {string} [sheetName] - Optional: specific sheet name (defaults to first sheet)
 * @returns {Cypress.Chainable<Array<Object>>} Parsed Excel rows as key-value objects
 */
export function parseExcel(filePath, sheetName) {
  return cy.readFile(filePath, "binary").then((fileContent) => {
    // Read the binary file content
    const workbook = XLSX.read(fileContent, { type: "binary" });

    // Select the target sheet or default to the first sheet
    const targetSheet = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];

    // Convert sheet rows into JSON objects using headers as keys
    return XLSX.utils.sheet_to_json(worksheet);
  });
}
