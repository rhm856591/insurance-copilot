# Appendix: Life Insurance Policy Attributes

## Common Policy Attributes

### Basic Information
- **Policy Number**: Unique identifier for the policy
- **Policy Type**: Term Life, Whole Life, Endowment, ULIP, Money Back, Child Plan, Pension Plan
- **Policy Holder Name**: Name of the insured person
- **Sum Assured**: Coverage amount (death benefit)
- **Premium Amount**: Payment amount (monthly/quarterly/half-yearly/yearly)
- **Premium Frequency**: Payment schedule
- **Policy Term**: Total duration of the policy (in years)
- **Paying Term**: Duration for which premiums need to be paid (in years)
- **Policy Start Date**: Commencement date
- **Policy Maturity Date**: End date of the policy
- **Next Premium Due Date**: Upcoming payment deadline
- **Grace Period**: Additional time allowed for premium payment (typically 30 days)

### Coverage Details
- **Base Sum Assured**: Primary coverage amount
- **Bonus Accumulated**: Additional benefits accrued (for participating policies)
- **Riders Attached**: Additional coverage options
  - Critical Illness Rider
  - Accidental Death Benefit Rider
  - Waiver of Premium Rider
  - Disability Rider
  - Hospital Cash Rider
- **Rider Sum Assured**: Coverage amount for each rider
- **Rider Premium**: Additional premium for riders

### Financial Information
- **Total Premium Paid**: Cumulative amount paid to date
- **Outstanding Premium**: Any pending payments
- **Surrender Value**: Amount payable if policy is surrendered
- **Loan Available**: Amount that can be borrowed against the policy
- **Outstanding Loan**: Current loan amount (if any)
- **Maturity Benefit**: Amount payable at maturity
- **Death Benefit**: Amount payable on death of insured

### Policy Status
- **Status**: Active, Lapsed, Paid-Up, Surrendered, Matured
- **Revival Period**: Time allowed to revive a lapsed policy
- **Free Look Period**: Initial period to cancel policy (typically 15-30 days)
- **Lock-in Period**: Minimum duration before surrender (for ULIP: 5 years)

### Nominee Information
- **Nominee Name**: Beneficiary name
- **Nominee Relationship**: Relation to policy holder
- **Nominee Date of Birth**: Age verification
- **Appointee Name**: Guardian for minor nominee (if applicable)

### Tax Benefits
- **Section 80C Benefit**: Premium deduction (up to ₹1.5 lakh)
- **Section 10(10D) Benefit**: Maturity/death benefit exemption
- **Tax Saving Amount**: Estimated annual tax savings

## Policy Type Specific Attributes

### Term Life Insurance
- **Renewable**: Whether policy can be renewed
- **Convertible**: Option to convert to whole life/endowment
- **Return of Premium**: Whether premiums are returned at maturity
- **Increasing/Decreasing Cover**: Coverage amount variation

### ULIP (Unit Linked Insurance Plan)
- **Fund Type**: Equity, Debt, Balanced
- **NAV (Net Asset Value)**: Current unit value
- **Number of Units**: Units allocated
- **Fund Value**: Current investment value
- **Switching Options**: Ability to change fund allocation
- **Partial Withdrawal**: Amount that can be withdrawn
- **Fund Management Charges**: Annual fees
- **Mortality Charges**: Cost of insurance cover
- **Premium Allocation Charge**: Percentage deducted from premium

### Endowment Plan
- **Guaranteed Additions**: Fixed bonus additions
- **Reversionary Bonus**: Annual bonus rate
- **Terminal Bonus**: Final bonus at maturity
- **Survival Benefits**: Periodic payouts (if any)

### Money Back Policy
- **Survival Benefit Percentage**: Percentage of sum assured paid periodically
- **Survival Benefit Schedule**: Timeline of payouts
- **Remaining Sum Assured**: Coverage after survival benefits

### Child Plan
- **Child's Name**: Beneficiary child
- **Child's Date of Birth**: Age tracking
- **Milestone Benefits**: Payouts at specific ages (e.g., 18, 21, 25)
- **Waiver of Premium**: Automatic if parent dies
- **Education Benefit**: Specific payout for education

### Pension/Retirement Plan
- **Vesting Age**: Age when pension starts
- **Annuity Type**: Life, joint life, guaranteed period
- **Annuity Amount**: Monthly/yearly pension
- **Deferment Period**: Time before pension starts
- **Commutation Option**: Lump sum withdrawal percentage

### Whole Life Insurance
- **Coverage Duration**: Typically up to age 100
- **Cash Value**: Accumulated savings component
- **Dividend Options**: Cash, premium reduction, paid-up additions

## Additional Attributes for CRM

### Customer Interaction
- **Last Contact Date**: Most recent communication
- **Contact Frequency**: How often customer is contacted
- **Preferred Contact Method**: Phone, Email, WhatsApp, In-person
- **Preferred Contact Time**: Best time to reach customer
- **Language Preference**: Communication language

### Sales & Marketing
- **Lead Source**: How customer was acquired
- **Agent Name**: Assigned insurance agent
- **Agent Code**: Unique agent identifier
- **Branch**: Office location
- **Campaign**: Marketing campaign (if applicable)
- **Cross-sell Opportunities**: Other products customer might need
- **Upsell Opportunities**: Upgrades or additional coverage

### Risk Assessment
- **Medical Examination**: Required/Completed/Waived
- **Health Status**: Any pre-existing conditions
- **Occupation**: Job type (affects risk)
- **Smoking Status**: Smoker/Non-smoker
- **BMI**: Body Mass Index
- **Annual Income**: Income verification
- **Existing Policies**: Other insurance coverage

### Compliance & Documentation
- **KYC Status**: Know Your Customer verification
- **PAN Number**: Tax identification
- **Aadhaar Number**: Identity verification
- **Bank Account Details**: For premium payment/benefit payout
- **NEFT/RTGS Mandate**: Auto-debit authorization
- **Policy Document Issued**: Physical/Digital copy provided
- **Proposal Form**: Application document
- **Medical Reports**: Health examination results
- **Income Proof**: Salary slips, ITR, etc.

### Service Requests
- **Pending Requests**: Any open service tickets
- **Request Type**: Claim, Surrender, Loan, Address change, etc.
- **Request Status**: Pending, In-progress, Completed
- **Request Date**: When request was made
- **Resolution Date**: When request was resolved

### Claims Information
- **Claim Number**: Unique claim identifier
- **Claim Type**: Death, Maturity, Survival benefit
- **Claim Amount**: Amount claimed
- **Claim Status**: Submitted, Under review, Approved, Rejected, Paid
- **Claim Date**: When claim was filed
- **Settlement Date**: When claim was paid
- **Rejection Reason**: If claim was rejected

## IRDAI Compliance Attributes

### Mandatory Disclosures
- **Insurance Company Name**: LIC, HDFC Life, ICICI Prudential, etc.
- **IRDAI Registration Number**: Regulatory identifier
- **Product UIN**: Unique Identification Number for the product
- **Free Look Period**: Cancellation period disclosure
- **Grievance Redressal**: Contact information for complaints
- **Ombudsman Details**: Insurance ombudsman contact

### Risk Disclosures (for ULIP)
- **Market Risk Warning**: Investment subject to market risks
- **Past Performance Disclaimer**: Past returns not indicative of future
- **Fund Performance**: Historical returns
- **Charges Disclosure**: All applicable fees and charges

### Policy Servicing
- **Customer Service Number**: Toll-free helpline
- **Email Support**: Customer service email
- **Online Portal**: Website for policy management
- **Mobile App**: Digital service access
- **Branch Address**: Physical office location

## Data Privacy & Security

### PII (Personally Identifiable Information)
- All customer personal data must be encrypted
- Access logs maintained for audit
- Data retention policies followed
- GDPR/Data Protection Act compliance

### PHI (Protected Health Information)
- Medical records encrypted and access-controlled
- Shared only with authorized personnel
- Consent required for sharing
- Secure transmission protocols

## Integration Requirements

### Fields for API Integration
```json
{
  "policyNumber": "LIC8921",
  "policyType": "Term Life",
  "policyHolderName": "Rajesh Kumar",
  "sumAssured": 10000000,
  "premiumAmount": 45000,
  "premiumFrequency": "Yearly",
  "policyTerm": 30,
  "payingTerm": 20,
  "policyStartDate": "2020-01-15",
  "policyMaturityDate": "2050-01-15",
  "nextPremiumDueDate": "2024-11-20",
  "status": "Active",
  "riders": [
    {
      "riderType": "Critical Illness",
      "sumAssured": 1000000,
      "premium": 5000
    }
  ],
  "nomineeDetails": {
    "name": "Priya Kumar",
    "relationship": "Spouse",
    "dateOfBirth": "1988-05-20"
  }
}
```

## Display Priority for UI

### High Priority (Always Show)
1. Policy Number
2. Policy Type
3. Sum Assured
4. Premium Amount
5. Next Due Date
6. Status

### Medium Priority (Show in Detail View)
1. Policy Term
2. Paying Term
3. Riders
4. Nominee Details
5. Maturity Date

### Low Priority (Show on Demand)
1. Surrender Value
2. Loan Details
3. Tax Benefits
4. Historical Transactions

## Glossary

- **Sum Assured**: The guaranteed amount payable on death or maturity
- **Premium**: Regular payment to keep policy active
- **Maturity**: End of policy term
- **Surrender**: Voluntary termination of policy before maturity
- **Lapsed**: Policy inactive due to non-payment of premium
- **Paid-Up**: Policy with reduced benefits after stopping premium payments
- **Rider**: Additional coverage attached to base policy
- **Bonus**: Additional benefit declared by insurance company
- **NAV**: Net Asset Value - unit price in ULIP
- **Vesting**: When pension benefits become available
- **Annuity**: Regular periodic payment in pension plans
- **Grace Period**: Extra time allowed for premium payment
- **Free Look Period**: Time to cancel policy and get refund
