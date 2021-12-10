closing_chars = {
  ']' => '[',
  '}' => '{',
  '>' => '<',
  ')' => '('
}.freeze

points = {
  ')' => 3,
  ']' => 57,
  '}' => 1197,
  '>' => 25137
}.freeze

score = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  stack = []

  line.chomp.chars.each do |char|
    last_char = stack.pop

    if closing_chars[char]
      if closing_chars[char] != last_char
        score += points[char]
        break
      end
    else
      stack << last_char if last_char
      stack << char
    end
  end
end

puts score
