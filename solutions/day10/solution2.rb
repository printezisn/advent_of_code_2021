closing_chars = {
  ']' => '[',
  '}' => '{',
  '>' => '<',
  ')' => '('
}.freeze

points = {
  '(' => 1,
  '[' => 2,
  '{' => 3,
  '<' => 4
}.freeze

scores = []

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  stack = []
  invalid = false

  line.chomp.chars.each do |char|
    last_char = stack.pop

    if closing_chars[char]
      if closing_chars[char] != last_char
        invalid = true
        break
      end
    else
      stack << last_char if last_char
      stack << char
    end
  end

  next if invalid

  score = 0
  stack.reverse.each do |char|
    score = score * 5 + points[char]
  end

  scores << score
end

puts scores.sort[scores.size / 2]
