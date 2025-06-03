from playwright.sync_api import sync_playwright

def test_first_load():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('https://www.joshuamae.com')
        assert page.title() == 'Joshua Mae'
        browser.close()

def main():
    test_first_load()

if __name__ == "__main__":
    main()