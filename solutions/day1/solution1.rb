prev = nil
total = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |num|
  total += 1 if prev && num.to_i > prev
  prev = num.to_i
end

puts "Total: #{total}"