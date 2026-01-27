#!/usr/bin/env python3
"""
Backend API Testing for The Impacts Marketing Agency
Tests all backend endpoints with proper validation and error handling
"""

import requests
import json
import sys
from datetime import datetime

# Use the production URL from frontend/.env
BASE_URL = "https://seo-meta-social.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}Testing: {test_name}{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.END}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.END}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.END}")

def test_base_api():
    """Test GET /api/ endpoint"""
    print_test_header("Base API - GET /api/")
    
    try:
        response = requests.get(f"{BASE_URL}/")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "The Impacts API is running":
                print_success("Base API working correctly")
                return True
            else:
                print_error(f"Unexpected response: {data}")
                return False
        else:
            print_error(f"Base API failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Base API connection failed: {str(e)}")
        return False

def test_contact_form_valid():
    """Test POST /api/contact with valid data"""
    print_test_header("Contact Form API - Valid Data")
    
    valid_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "service": "seo",
        "budget": "3k-5k",
        "message": "I need SEO help for my business"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=valid_data)
        
        if response.status_code == 201:
            data = response.json()
            required_fields = ["id", "name", "email", "service", "message", "created_at"]
            
            for field in required_fields:
                if field not in data:
                    print_error(f"Missing field in response: {field}")
                    return False
            
            if data["name"] == valid_data["name"] and data["email"] == valid_data["email"]:
                print_success("Contact form submission successful with valid data")
                return True
            else:
                print_error("Response data doesn't match input data")
                return False
        else:
            print_error(f"Contact form failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Contact form test failed: {str(e)}")
        return False

def test_contact_form_validation():
    """Test POST /api/contact with invalid data"""
    print_test_header("Contact Form API - Validation Tests")
    
    test_cases = [
        {
            "name": "Invalid Email",
            "data": {
                "name": "John Doe",
                "email": "invalid-email",
                "service": "seo",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Missing Required Fields",
            "data": {
                "name": "John Doe"
            },
            "expected_status": 422
        },
        {
            "name": "Invalid Service Enum",
            "data": {
                "name": "John Doe",
                "email": "john@example.com",
                "service": "invalid_service",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Invalid Budget Enum",
            "data": {
                "name": "John Doe",
                "email": "john@example.com",
                "service": "seo",
                "budget": "invalid_budget",
                "message": "Test message"
            },
            "expected_status": 422
        },
        {
            "name": "Short Message",
            "data": {
                "name": "John Doe",
                "email": "john@example.com",
                "service": "seo",
                "message": "Short"
            },
            "expected_status": 422
        }
    ]
    
    all_passed = True
    
    for test_case in test_cases:
        try:
            response = requests.post(f"{BASE_URL}/contact", json=test_case["data"])
            
            if response.status_code == test_case["expected_status"]:
                print_success(f"Validation test '{test_case['name']}' passed")
            else:
                print_error(f"Validation test '{test_case['name']}' failed - Expected {test_case['expected_status']}, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_error(f"Validation test '{test_case['name']}' failed with exception: {str(e)}")
            all_passed = False
    
    return all_passed

def test_contact_form_enums():
    """Test POST /api/contact with all valid enum values"""
    print_test_header("Contact Form API - Enum Values Test")
    
    services = ["seo", "meta", "social", "all"]
    budgets = ["1k-3k", "3k-5k", "5k-10k", "10k+"]
    
    all_passed = True
    
    # Test all service types
    for service in services:
        test_data = {
            "name": "Test User",
            "email": f"test_{service}@example.com",
            "service": service,
            "message": f"Testing {service} service inquiry"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=test_data)
            
            if response.status_code == 201:
                print_success(f"Service enum '{service}' accepted")
            else:
                print_error(f"Service enum '{service}' failed with status {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_error(f"Service enum test for '{service}' failed: {str(e)}")
            all_passed = False
    
    # Test all budget ranges
    for budget in budgets:
        test_data = {
            "name": "Test User",
            "email": f"test_{budget.replace('-', '_').replace('+', 'plus')}@example.com",
            "service": "seo",
            "budget": budget,
            "message": f"Testing {budget} budget range"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", json=test_data)
            
            if response.status_code == 201:
                print_success(f"Budget enum '{budget}' accepted")
            else:
                print_error(f"Budget enum '{budget}' failed with status {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_error(f"Budget enum test for '{budget}' failed: {str(e)}")
            all_passed = False
    
    return all_passed

def test_get_contacts():
    """Test GET /api/contact endpoint"""
    print_test_header("Get Contacts API - GET /api/contact")
    
    try:
        response = requests.get(f"{BASE_URL}/contact")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print_success(f"Get contacts successful - Retrieved {len(data)} contacts")
                
                # Check if we have any contacts and validate structure
                if len(data) > 0:
                    contact = data[0]
                    required_fields = ["id", "name", "email", "service", "message", "created_at"]
                    
                    for field in required_fields:
                        if field not in contact:
                            print_error(f"Missing field in contact response: {field}")
                            return False
                    
                    print_success("Contact data structure is valid")
                
                return True
            else:
                print_error("Response is not a list")
                return False
        else:
            print_error(f"Get contacts failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Get contacts test failed: {str(e)}")
        return False

def test_newsletter_valid():
    """Test POST /api/newsletter with valid email"""
    print_test_header("Newsletter API - Valid Email")
    
    # Use timestamp to ensure unique email
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    test_email = f"test_{timestamp}@example.com"
    
    valid_data = {
        "email": test_email
    }
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter", json=valid_data)
        
        if response.status_code == 201:
            data = response.json()
            required_fields = ["id", "email", "subscribed_at"]
            
            for field in required_fields:
                if field not in data:
                    print_error(f"Missing field in newsletter response: {field}")
                    return False
            
            if data["email"] == test_email:
                print_success("Newsletter subscription successful")
                return True
            else:
                print_error("Response email doesn't match input email")
                return False
        else:
            print_error(f"Newsletter subscription failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Newsletter subscription test failed: {str(e)}")
        return False

def test_newsletter_duplicate():
    """Test POST /api/newsletter with duplicate email"""
    print_test_header("Newsletter API - Duplicate Email Test")
    
    test_email = "duplicate_test@example.com"
    test_data = {"email": test_email}
    
    try:
        # First subscription
        response1 = requests.post(f"{BASE_URL}/newsletter", json=test_data)
        
        if response1.status_code == 201:
            print_success("First newsletter subscription successful")
            
            # Second subscription (should fail with 409)
            response2 = requests.post(f"{BASE_URL}/newsletter", json=test_data)
            
            if response2.status_code == 409:
                print_success("Duplicate email correctly rejected with 409 status")
                return True
            else:
                print_error(f"Duplicate email test failed - Expected 409, got {response2.status_code}")
                return False
        else:
            print_error(f"First newsletter subscription failed with status {response1.status_code}")
            return False
            
    except Exception as e:
        print_error(f"Newsletter duplicate test failed: {str(e)}")
        return False

def test_newsletter_invalid_email():
    """Test POST /api/newsletter with invalid email"""
    print_test_header("Newsletter API - Invalid Email")
    
    invalid_emails = [
        "invalid-email",
        "test@",
        "@example.com",
        "test.example.com",
        ""
    ]
    
    all_passed = True
    
    for email in invalid_emails:
        test_data = {"email": email}
        
        try:
            response = requests.post(f"{BASE_URL}/newsletter", json=test_data)
            
            if response.status_code == 422:
                print_success(f"Invalid email '{email}' correctly rejected")
            else:
                print_error(f"Invalid email '{email}' should be rejected but got status {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_error(f"Invalid email test for '{email}' failed: {str(e)}")
            all_passed = False
    
    return all_passed

def test_get_newsletter():
    """Test GET /api/newsletter endpoint"""
    print_test_header("Get Newsletter Subscribers - GET /api/newsletter")
    
    try:
        response = requests.get(f"{BASE_URL}/newsletter")
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print_success(f"Get newsletter subscribers successful - Retrieved {len(data)} subscribers")
                
                # Check if we have any subscribers and validate structure
                if len(data) > 0:
                    subscriber = data[0]
                    required_fields = ["id", "email", "subscribed_at"]
                    
                    for field in required_fields:
                        if field not in subscriber:
                            print_error(f"Missing field in subscriber response: {field}")
                            return False
                    
                    print_success("Newsletter subscriber data structure is valid")
                
                return True
            else:
                print_error("Response is not a list")
                return False
        else:
            print_error(f"Get newsletter subscribers failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Get newsletter subscribers test failed: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print(f"{Colors.BLUE}Starting Backend API Tests for The Impacts Marketing Agency{Colors.END}")
    print(f"{Colors.BLUE}Base URL: {BASE_URL}{Colors.END}")
    
    test_results = []
    
    # Test base API
    test_results.append(("Base API", test_base_api()))
    
    # Test contact form APIs
    test_results.append(("Contact Form - Valid Data", test_contact_form_valid()))
    test_results.append(("Contact Form - Validation", test_contact_form_validation()))
    test_results.append(("Contact Form - Enum Values", test_contact_form_enums()))
    test_results.append(("Get Contacts", test_get_contacts()))
    
    # Test newsletter APIs
    test_results.append(("Newsletter - Valid Email", test_newsletter_valid()))
    test_results.append(("Newsletter - Duplicate Email", test_newsletter_duplicate()))
    test_results.append(("Newsletter - Invalid Email", test_newsletter_invalid_email()))
    test_results.append(("Get Newsletter Subscribers", test_get_newsletter()))
    
    # Print summary
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        if result:
            print_success(f"{test_name}")
            passed += 1
        else:
            print_error(f"{test_name}")
            failed += 1
    
    print(f"\n{Colors.BLUE}Total Tests: {len(test_results)}{Colors.END}")
    print(f"{Colors.GREEN}Passed: {passed}{Colors.END}")
    print(f"{Colors.RED}Failed: {failed}{Colors.END}")
    
    if failed == 0:
        print(f"\n{Colors.GREEN}🎉 All tests passed!{Colors.END}")
        return 0
    else:
        print(f"\n{Colors.RED}❌ {failed} test(s) failed{Colors.END}")
        return 1

if __name__ == "__main__":
    sys.exit(main())