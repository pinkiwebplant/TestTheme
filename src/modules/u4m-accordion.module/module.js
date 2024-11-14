$(".u4m-accordion .accordion").on("click", ".accordion-header", function() {
    $(this).toggleClass("active").next().slideToggle();
});