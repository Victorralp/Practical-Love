/**
 * Certificate Service for generating completion certificates
 * Requirements: 4.4
 */

export interface CertificateData {
  completionDate: string;
  startDate: string;
  daysCompleted: number;
}

/**
 * Generate certificate HTML content
 */
function generateCertificateHTML(data: CertificateData): string {
  const formattedCompletionDate = new Date(data.completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>30-Day Love Challenge Certificate</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Open Sans', sans-serif;
      background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .certificate {
      background: white;
      width: 800px;
      padding: 60px;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      text-align: center;
      position: relative;
      border: 8px solid #dc2626;
    }
    
    .certificate::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 2px solid #f97316;
      border-radius: 12px;
      pointer-events: none;
    }
    
    .header-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #dc2626, #f97316);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .heart {
      width: 40px;
      height: 40px;
      fill: white;
    }
    
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      color: #991b1b;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .subtitle {
      font-size: 18px;
      color: #ea580c;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 40px;
    }
    
    .presented-to {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 10px;
    }
    
    .recipient-line {
      width: 400px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #dc2626, transparent);
      margin: 30px auto;
    }
    
    .achievement {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #374151;
      margin: 30px 0;
      line-height: 1.6;
    }
    
    .highlight {
      color: #dc2626;
      font-weight: 700;
    }
    
    .verse {
      font-style: italic;
      color: #6b7280;
      margin: 30px 0;
      padding: 20px;
      background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%);
      border-radius: 10px;
    }
    
    .verse-text {
      font-size: 16px;
      margin-bottom: 10px;
    }
    
    .verse-ref {
      font-size: 14px;
      color: #9ca3af;
    }
    
    .date {
      font-size: 14px;
      color: #6b7280;
      margin-top: 30px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    
    .org-name {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: #dc2626;
      font-weight: 700;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .certificate {
        box-shadow: none;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header-icon">
      <svg class="heart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    
    <h1 class="title">Certificate of Completion</h1>
    <p class="subtitle">30-Day Love Challenge</p>
    
    <p class="presented-to">This certificate is presented to</p>
    <div class="recipient-line"></div>
    
    <p class="achievement">
      For successfully completing the <span class="highlight">30-Day Love Challenge</span>,
      demonstrating commitment to practicing the <span class="highlight">17 characteristics of love</span>
      from 1 Corinthians 13, and taking meaningful steps toward a life transformed by love.
    </p>
    
    <div class="verse">
      <p class="verse-text">"And now these three remain: faith, hope and love. But the greatest of these is love."</p>
      <p class="verse-ref">— 1 Corinthians 13:13</p>
    </div>
    
    <p class="date">Completed on ${formattedCompletionDate}</p>
    
    <div class="footer">
      <p class="org-name">Practical Love Ministry</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Download the certificate as an HTML file
 */
export function downloadCertificate(data: CertificateData): void {
  const html = generateCertificateHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'love-challenge-certificate.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Open certificate in a new window for printing
 */
export function printCertificate(data: CertificateData): void {
  const html = generateCertificateHTML(data);
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
