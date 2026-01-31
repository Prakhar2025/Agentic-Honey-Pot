
import json
import random
import os

# Configuration
TOTAL_SCENARIOS = 100

SCAM_TYPES = {
    "KYC_PHISHING": 20,
    "LOTTERY_PRIZE": 15,
    "INVESTMENT_FRAUD": 15,
    "IMPERSONATION": 15,
    "LOAN_SCAM": 10,
    "JOB_SCAM": 10,
    "OTP_THEFT": 10,
    "TECH_SUPPORT": 5
}

BANKS = ["SBI", "HDFC", "ICICI", "Axis Bank", "PNB", "BoB"]
UPI_APPS = ["paytm", "ybl", "phonepe", "gpay", "axl"]
CITIES = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"]

TEMPLATES = {
    "KYC_PHISHING": [
        "Dear customer, your {bank} KYC will expire today. Update now: {link} or call {phone}",
        "Important: Your {bank} account blocked due to pending KYC. Click {link} to activate immediately.",
        "{bank} Alert: PAN card not linked. Update immediately at {link} to avoid penalty.",
        "Warning: Your {bank} access is suspended. Call {phone} to restore access."
    ],
    "LOTTERY_PRIZE": [
        "Congratulations! You won Rs. {amount} in {season} Lucky Draw. Call {phone} to claim prize.",
        "KBC Winner! Your number won Rs. {amount}. WhatsApp {phone} immediately.",
        "Claim your {season} bonanza of Rs. {amount}. Pay processing fee to {upi} to release funds.",
        "Jackpot alert! You won Rs. {amount}. Contact manager at {phone}."
    ],
    "INVESTMENT_FRAUD": [
        "Double your money in 21 days! Guaranteed returns. Join WhatsApp group: {link}",
        "Work from home opportunity. Earn Rs. {daily}/day. Invest Rs. {invest} via {upi} to start.",
        "Crypto trading tips for guaranteed profit. Join exclusive channel: {link}",
        "Stock market insider tips. 500% returns guaranteed. Contact {phone}."
    ],
    "IMPERSONATION": [
        "Hi Dad, lost my phone. Need money for urgent bill. Send Rs. {urgent} to {upi}. New number.",
        "Hello, this is {name} from police station. Your son is in trouble. Call {phone}.",
        "Hi, I am sending money by mistake to your QR code. Please scan to receive.",
        "Sir, parcel stuck at customs. Pay duty Rs. {urgent} to {upi} to release."
    ],
    "LOAN_SCAM": [
        "Pre-approved personal loan Rs. {loan} @ 2% interest. Apply now: {link}",
        "Instant loan approval without CIBIL score. Process fee Rs. {fee}. Pay to {upi}.",
        "Your loan limit increased to Rs. {loan}. Call {phone} to activate.",
        "Paperless loan in 10 mins. Download app: {link}"
    ],
    "JOB_SCAM": [
        "Hiring for Amazon/Flipkart. WFH usage. Salary Rs. {salary}. Apply: {link}",
        "Part-time job. Like youtube videos and earn Rs. {daily}. WhatsApp {phone}.",
        "HR Manager: Your profile selected. Registration fee Rs. {fee}. Pay to {upi}.",
        "Data entry job. No skill needed. Daily payment Rs. {daily}. Contact {phone}."
    ],
    "OTP_THEFT": [
        "Your card ending {card} is used for Rs. {amount}. If not you, share OTP to cancel.",
        "Electricity power cut notice. Update status or power cut tonight. Call {phone}.",
        "Redeem your reward points worth Rs. {amount}. Share OTP sent to mobile.",
        "Verification code for your order. Share with delivery boy."
    ],
    "TECH_SUPPORT": [
        "Microsoft Windows Alert: Virus detected. Call {phone} to fix immediately.",
        "Your computer has been hacked. Call support {phone} for refund.",
        "Subscription renewed for Rs. {amount}. Call {phone} to cancel."
    ]
}

def gen_phone():
    return f"{random.randint(6,9)}{random.randint(100000000, 999999999)}"

def gen_link():
    domains = ["bit.ly", "tinyurl", "update-bank-kyc.com", "secure-login-123.com", "offer-prize.in"]
    return f"http://{random.choice(domains)}/{random.randint(1000,9999)}"

def gen_upi():
    return f"{random.choice(['pay', 'merchant', 'shop', 'admin'])}{random.randint(100,999)}@{random.choice(UPI_APPS)}"

def gen_account():
    return str(random.randint(10000000000, 99999999999))

def gen_ifsc(bank):
    return f"{bank[:4].upper()}{random.randint(1000000, 9999999)}"

def generate_scenarios():
    scenarios = []
    id_counter = 1
    
    # Create flattened list of types based on counts
    type_pool = []
    for stype, count in SCAM_TYPES.items():
        type_pool.extend([stype] * count)
    random.shuffle(type_pool)
    
    for stype in type_pool:
        # Attributes
        bank = random.choice(BANKS)
        phone = gen_phone()
        link = gen_link()
        upi = gen_upi()
        account = gen_account()
        ifsc = gen_ifsc(bank)
        
        # Determine extractions based on probability targets
        has_phone = random.random() < 0.80
        has_upi = random.random() < 0.60
        has_bank = random.random() < 0.40
        has_link = random.random() < 0.30
        has_ifsc = random.random() < 0.20
        
        # Select template
        template = random.choice(TEMPLATES.get(stype, TEMPLATES["KYC_PHISHING"]))
        
        # Build message params
        params = {
            "bank": bank,
            "phone": phone if has_phone else "9XXXXXXXXX",
            "link": link if has_link else "http://...",
            "upi": upi if has_upi else "user@upi",
            "amount": f"{random.randint(1,99)}000",
            "urgent": f"{random.randint(500,5000)}",
            "season": random.choice(["Diwali", "New Year", "Holi", "Summer"]),
            "invest": f"{random.randint(1000,5000)}",
            "daily": f"{random.randint(500,2000)}",
            "salary": f"{random.randint(20,50)}000",
            "loan": f"{random.randint(1,10)} Lakhs",
            "fee": f"{random.randint(100,999)}",
            "card": f"{random.randint(1000,9999)}",
            "name": random.choice(["Inspector Sharma", "Officer Patil", "Customs Officer"])
        }
        
        message = template.format(**params)
        
        # Expected extraction construction
        expected = {}
        if has_phone and phone in message: expected["phone_numbers"] = [phone]
        if has_upi and upi in message: expected["upi_ids"] = [upi]
        if has_link and link in message: expected["phishing_links"] = [link]
        if has_bank: expected["bank_mentions"] = [bank]
        if has_ifsc: expected["ifsc_codes"] = [ifsc] # Mostly implicit in real messages but kept for structure
        if has_bank and random.random() < 0.5: expected["bank_accounts"] = [account]
        
        scenario = {
            "id": id_counter,
            "scam_type": stype,
            "source_type": random.choice(["sms", "whatsapp", "telegram"]),
            "message": message,
            "expected_extractions": expected,
            "expected_scam_confidence": round(random.uniform(0.75, 0.99), 2),
            "region": random.choice(CITIES)
        }
        
        scenarios.append(scenario)
        id_counter += 1
        
    output = {"scenarios": scenarios}
    
    os.makedirs("tests", exist_ok=True)
    with open("tests/test_scenarios.json", "w") as f:
        json.dump(output, f, indent=2)
    
    print(f"Generated {len(scenarios)} scenarios in tests/test_scenarios.json")

if __name__ == "__main__":
    generate_scenarios()
