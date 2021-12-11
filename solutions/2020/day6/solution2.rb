total = 0
questions = nil

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  line = line.chomp

  if line.empty?
    total += questions.size
    questions = nil
  else
    questions = questions ? (questions & line.chars) : line.chars
  end
end

puts total + (questions || []).size