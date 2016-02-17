var config = {
  'desired_sizes': ['9', '9.5', '10', '8.5', '8', '10.5', '11', '11.5', '12'], // arranged in order of preference
  'billing_different_than_shipping': true, // set to use diff billing address
  'first_name': 'Hypebeast',
  'last_name': 'McYeezus',
  'street_address_1': '2 Supreme St.',
  'street_address_2': 'Suite 6',
  'city': 'New York',
  'state': 'New York',
  'zipcode': '10013',
  'phone_number': 'XXX-XXX-XXXX', // must be in this format
  'billing_address_1': 'Billionaire Boys',
  'billing_address_2': '',
  'billing_city': 'Fairfax',
  'billing_state': 'California',
  'billing_zipcode': '90036',
  'name_on_card': 'Hypebeast McYeezus',
  'card_number': 'STEALMYIDENTITY101',
  'expires_month': 'January', // must be full month name to match adidas.com
  'expires_year': '2001',
  'security_code': '404'
};

function placeOrder () {
  console.log('PLACING ORDER!!!!! PRAY FOR ME FAM!!!');
  $('button.place-order').trigger('click');
}

function pay () {
  $('input#dwfrm_payment_creditCard_owner').val(function () {
    return config.name_on_card;
  });

  $('input#dwfrm_payment_creditCard_number').val(function () {
    return config.card_number;
  });

  $('div.month .ffSelectButton').trigger('click');

  $('div.month .ffSelectMenuMid > ul > li').each(function() {
    if ($(this).text().trim().toLowerCase().indexOf(config.expires_month.toLowerCase()) > -1) {
      $(this).trigger('click');
    }
  });

  $('div.year .ffSelectButton').trigger('click');

  $('div.year .ffSelectMenuMid > ul > li').each(function() {
    if ($(this).text().trim() == config.expires_year) {
      $(this).trigger('click');
    }
  });

  $('input#dwfrm_payment_creditCard_cvn').val(function () {
    return config.security_code;
  });

  setTimeout(function () {
    placeOrder();
  }, 300);
}

function addNewShipping() {
  $('.textinput.firstname').val(function () {
    return config.first_name;
  });

  $('.textinput.lastname').val(function () {
    return config.last_name;
  });

  $('.textinput.address1').val(function () {
    return config.street_address_1;
  });

  $('.textinput.address2').val(function () {
    return config.street_address_2;
  });

  $('.textinput.city').val(function () {
    return config.city;
  });

  $('.textinput.state').val(function () {
    return config.state;
  });

  $('.textinput.phone').val(function () {
    return config.phone_number;
  });

  $('.textinput.zip').val(function () {
    return config.zipcode;
  });

  if (config.billing_different_than_shipping) {
    $('.shipping .countyprovince .ffSelectButton').trigger('click');

    $('.shipping .countyprovince .ffSelectMenuMid > ul > li').each(function() {
      if ($(this).text().trim() == config.state) {
        $(this).trigger('click');
      }
    });

    $('.second-address-option .ffCheckbox').trigger('click');

    $('.co-billing .textinput.address1').val(function () {
      return config.billing_address_1;
    });

    $('.co-billing .textinput.address2').val(function () {
      return config.billing_address_2;
    });

    $('.co-billing .textinput.city').val(function () {
      return config.billing_city;
    });

    $('.billing .countyprovince .ffSelectButton').trigger('click');

    $('.billing .countyprovince .ffSelectMenuMid > ul > li').each(function() {
      if ($(this).text().trim() == config.billing_state) {
        $(this).trigger('click');
      }
    });

    $('.co-billing .textinput.zip').val(function () {
      return config.billing_zipcode;
    });
  }

  saveDelivery();
}

function saveDelivery () {
  setTimeout(function() {
    $('button.js-save-delivery').trigger('click');
  }, 300);
}

function correctBilling (cb) {
  $('.billingdetails .new-address .ffRadio').trigger('click');

  $('.billing .textinput.firstname').val(function () {
    return config.first_name;
  });

  $('.billing .textinput.lastname').val(function () {
    return config.last_name;
  });

  $('.billing .textinput.address1').val(function () {
    return config.billing_address_1;
  });

  $('.billing .textinput.address2').val(function () {
    return config.billing_address_2;
  });

  $('.billing .textinput.city').val(function () {
    return config.billing_city;
  });

  $('.billing .countyprovince .ffSelectButton').trigger('click');

  $('.billing .countyprovince .ffSelectMenuMid > ul > li').each(function() {
    if ($(this).text().trim() == config.billing_state) {
      $(this).trigger('click');
    }
  });

  $('.billing .textinput.zip').val(function () {
    return config.billing_zipcode;
  });

  $('.billing .textinput.phone').val(function () {
    return config.phone_number;
  });

  setTimeout(function () {
    cb();
  }, 300);
}

function clickBilling (cb) {
  $('.second-address-option .ffCheckbox').trigger('click');
  setTimeout(function() {
    if ($('.co-billing').length && !$('.co-billing').hasClass('disabled')) {
      cb();
    }
    else clickBilling(cb);
  }, 300);
}

function checkCorrectBilling (cb) {
  clickBilling(function() {
    if ($('.addresslist_holder-billing .select-address.active').find('.address1').text().trim() !== config.billing_address_1) {
      console.log('INCORRECT BILLING, LOOKING FOR CORRECT ONE ....')
      var foundBilling = false;
      $('.addresslist_holder-billing .select-address').each(function(index) {
        if (foundBilling) return;

        if ($(this).find('.address1').text().trim() == config.billing_address_1) {
          console.log('FOUND CORRECT ADDRESS, CHOOSING THAT ONE')
          foundBilling = true;
          $(this).find('.ffRadio').trigger('click');
          cb();
        } else if (index === ($('.addresslist_holder-billing .select-address').length - 1)) {
          console.log('FOUND NO CORRECT ADDRESSES, MAKING ONE');
          correctBilling(cb);
        }
      });
    } else {
      console.log('BILLING CORRECT !');
      cb();
    }
  });
}

function correctShipping (cb) {
  $('.shipping .textinput.firstname').val(function () {
    return config.first_name;
  });

  $('.shipping .textinput.lastname').val(function () {
    return config.last_name;
  });

  $('.shipping .textinput.address1').val(function () {
    return config.shipping_address_1;
  });

  $('.shipping .textinput.address2').val(function () {
    return config.shipping_address_2;
  });

  $('.shipping .textinput.city').val(function () {
    return config.city;
  });

  $('.shipping .countyprovince .ffSelectButton').trigger('click');

  $('.shipping .countyprovince .ffSelectMenuMid > ul > li').each(function() {
    if ($(this).text().trim() == config.state) {
      $(this).trigger('click');
    }
  });

  $('.shipping .textinput.zip').val(function () {
    return config.zipcode;
  });

  $('.shipping .textinput.phone').val(function () {
    return config.phone_number;
  });

  setTimeout(function () {
    cb();
  }, 300);
}

function checkCorrectShipping (cb) {
  if ($('.shippingdetails .select-address.active').find('.address1').text().trim() !== config.street_address_1) {
    console.log('INCORRECT SHIPPING, LOOKING FOR CORRECT ONE ....')
    $('.select-address').each(function(index) {
      if ($(this).find('.address1').text().trim() == config.street_address_1) {
        console.log('FOUND CORRECT ADDRESS, CHOOSING THAT ONE')
        $(this).find('.ffRadio').trigger('click');
        cb();
      } else if (index === $('.select-address').length - 1) {
        console.log('FOUND NO CORRECT ADDRESSES, MAKING ONE');
        correctShipping(cb);
      }
    });
  } else {
    console.log('SHIPPING CORRECT !');
    cb();
  }
}

// jank mode promise to make sure shipping is ok
function addSavedShipping () {
  var timer, shippingOk = false, billingOk = false;

  checkCorrectShipping(function() {
    shippingOk = true;
  });

  if (config.billing_different_than_shipping) {
    checkCorrectBilling(function () {
      billingOk = true;
    });
  } else {
    billingOk = true;
  }

  var checkInfo = function () {
    if (shippingOk && billingOk) {
      clearInterval(timer);
      saveDelivery();
    }
  }

  timer = setInterval(checkInfo, 300);
}

function addShipping () {
  if ($('div.saved-address').length) addSavedShipping();
  else addNewShipping();
}

function waitForCaptcha(cb) {
  if ($('.g-recaptcha').length) {
    console.log('WAITING FOR CAPTCHA');
    $(document).keydown(function (e) {
      if (e.keyCode === 91) {
        cb();
      }
    })
  } else cb();
}

function addToBag () {
  waitForCaptcha (function() {
    $('body').bind('DOMNodeInserted', function(e) {
      if ($(e.target).find('a.btn_checkout').length) {
        $('a.btn_checkout span').trigger('click');
      }
    });

    $('.addtocart button.add-to-cart').trigger('click');
  });
}

function lookForSizes () {
  var timer, foundSize = false;

  var sizeChecker = function () {
    if ($('.size-dropdown-block .ffSelectButton').length) {
      clearInterval(timer);
      $('.size-dropdown-block .ffSelectButton').trigger('click');
      config.desired_sizes.forEach(function(size) {
        $('.size-dropdown-block .ffSelectMenuMid > ul > li').each(function () {
          if (foundSize) return;
          else if ($(this).text().trim() === size) {
            foundSize = true;
            console.log('FOUND IN A SIZE ', size);
            $(this).trigger('click');
            addToBag();
          }
        });
      });
    }
  }

  timer = setInterval(sizeChecker, 300);
}

// jank that reacts to URL changes
function urlChecker () {
  if (window.urlChecker) return;

  var lastUrl = window.location.href;

  window.urlChecker = setInterval(function() {
    if (lastUrl !== window.location.href) {
      lastUrl = window.location.href;
      checkPage();
    }
  }, 500);
}

function checkPage () {
  console.log('CHECKING PAGE!');

  // on the product landing page, try to cop in our size
  if ($('div#productInfo').length) {
    lookForSizes();
  }
  // on the cart page! smash that checkout button
  else if (window.location.href.indexOf('Cart-Show') > -1) {
    $('button[name=dwfrm_cart_checkoutCart]').trigger('click');
  }
  // aww shit we're shipping.. lets make sure info is correct
  else if (window.location.href.indexOf('delivery-start') > -1) {
    addShipping();
  }
  // bruh we're so close. please.
  else if ($('li.active.step-2').length) {
    pay();
  }
  // keep trying if nothing
  else {
    setTimeout(function() {
      checkPage();
    }, 1000);
  }
}

$(document).ready(function() {
  urlChecker();
  checkPage();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text == "TAKE MY MONEY") {
    urlChecker();
    checkPage();
  }
});
