from playwright.sync_api import sync_playwright, expect
import re


def github_link_check(page):
    page.goto('https://www.joshuamae.com')
    page.get_by_role("link", name="GitHub").click()
    page.wait_for_load_state()
    expect(page).to_have_url("https://github.com/joshua-mae")


def linkedin_link_check(page):
    page.goto('https://www.joshuamae.com')
    page.get_by_role("link", name="LinkedIn").click()
    page.wait_for_load_state()
    expect(page).to_have_url(re.compile(
        r"linkedin.*joshuazmae", re.IGNORECASE))


def email_link_check(page):
    page.goto('https://www.joshuamae.com')
    expect(page.get_by_role("link", name="Contact Me")).to_have_attribute(
        'href', re.compile(r"^mailto:.+"))


def test_header_links():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        github_link_check(page)
        linkedin_link_check(page)
        email_link_check(page)
        browser.close()


def main():
    test_header_links()


if __name__ == "__main__":
    main()
