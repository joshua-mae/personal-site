from playwright.sync_api import sync_playwright, expect


def test_header_links():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://joshuamae.com')
        page.get_by_role("link", name="GitHub").click()
        page.wait_for_load_state()
        expect(page).to_have_url("https://github.com/joshua-mae")
        browser.close()


def main():
    test_header_links()


if __name__ == "__main__":
    main()
