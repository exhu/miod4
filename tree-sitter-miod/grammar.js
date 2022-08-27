module.exports = grammar({
  name: 'miod',

  rules: {
    source_file: $ => seq(
      $.unit_header,
      optional($.unit_body),
      ),
    comment: $ => prec.right(repeat1($._comment_line)),
    _comment_line: $ => seq('#', /.*/),
    doc_comment: $ => prec.right(repeat1($._doc_comment_line)),
    _doc_comment_line: $ => seq('##', /.*/),
    unit_name: $ => seq('unit', field('name', $.identifier)),
    identifier: $ => /[A-Za-z_]+[0-9_]*[A-Za-z_]*/,
    unit_body: $ => repeat1(choice($.comment, $.doc_comment)),
    unit_header: $ => seq(
      optional($.comment),
      optional($.doc_comment),
      $.unit_name,
    ),
  }
});