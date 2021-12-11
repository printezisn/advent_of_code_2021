total = 0
questions = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  line = line.chomp

  if line.empty?
    total += questions.size
    questions = {}
  else
    line.chars.each { |q| questions[q] = 1 }
  end
end

puts total + questions.size